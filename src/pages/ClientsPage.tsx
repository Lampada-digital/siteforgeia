import { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { useAuthStore } from '../store/authStore';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Globe,
  MapPin,
  Phone,
  Edit3,
  Trash2,
  Eye,
  X,
  Users as UsersIcon,
} from 'lucide-react';
import type { Client } from '../types';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  building: 'bg-amber-100 text-amber-700',
  review: 'bg-blue-100 text-blue-700',
  published: 'bg-green-100 text-green-700',
  maintenance: 'bg-purple-100 text-purple-700',
};

const statusLabels: Record<string, string> = {
  draft: 'Rascunho',
  building: 'Em construção',
  review: 'Em revisão',
  published: 'Publicado',
  maintenance: 'Manutenção',
};

export default function ClientsPage() {
  const { clients, deleteClient } = useClientStore();
  const { user } = useAuthStore();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const filteredClients = clients
    .filter((c) => c.tenant_id === user?.tenant_id)
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.segment.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      deleteClient(id);
    }
    setMenuOpen(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600 mt-1">
            Gerencie seus clientes e seus sites
          </p>
        </div>
        <button
          onClick={() => {
            setEditingClient(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25 text-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, segmento ou cidade..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none bg-white"
          >
            <option value="all">Todos os status</option>
            <option value="draft">Rascunho</option>
            <option value="building">Em construção</option>
            <option value="review">Em revisão</option>
            <option value="published">Publicado</option>
            <option value="maintenance">Manutenção</option>
          </select>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.segment}</p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === client.id ? null : client.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
                {menuOpen === client.id && (
                  <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <button
                      onClick={() => {
                        setEditingClient(client);
                        setShowForm(true);
                        setMenuOpen(null);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Editar
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Eye className="w-3.5 h-3.5" />
                      Visualizar
                    </button>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Excluir
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Status */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[client.status]}`}
            >
              {statusLabels[client.status]}
            </span>

            {/* Info */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{client.city}, {client.state}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{client.phone}</span>
              </div>
              {client.domain && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  <span className="truncate">{client.domain}</span>
                </div>
              )}
            </div>

            {/* Services */}
            <div className="mt-3 flex flex-wrap gap-1">
              {client.services.slice(0, 3).map((service) => (
                <span
                  key={service}
                  className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {service}
                </span>
              ))}
              {client.services.length > 3 && (
                <span className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs">
                  +{client.services.length - 3}
                </span>
              )}
            </div>

            {/* Brand colors */}
            <div className="mt-3 flex items-center gap-1">
              {Object.entries(client.brand_colors).map(([key, color]) => (
                <div
                  key={key}
                  className="w-5 h-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  title={key}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum cliente encontrado</h3>
          <p className="text-gray-500 mt-1">
            {search ? 'Tente ajustar os filtros de busca' : 'Adicione seu primeiro cliente'}
          </p>
        </div>
      )}

      {/* Client Form Modal */}
      {showForm && (
        <ClientFormModal
          client={editingClient}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

// Client Form Modal Component
function ClientFormModal({
  client,
  onClose,
}: {
  client: Client | null;
  onClose: () => void;
}) {
  const { addClient, updateClient } = useClientStore();
  const { user } = useAuthStore();
  const isEditing = !!client;

  const [formData, setFormData] = useState({
    name: client?.name || '',
    segment: client?.segment || '',
    phone: client?.phone || '',
    whatsapp: client?.whatsapp || '',
    address: client?.address || '',
    city: client?.city || '',
    state: client?.state || '',
    website: client?.website || '',
    instagram: client?.instagram || '',
    description: client?.description || '',
    services: client?.services?.join(', ') || '',
    domain: client?.domain || '',
    status: (client?.status || 'draft') as Client['status'],
    primary_color: client?.brand_colors?.primary || '#7c3aed',
    secondary_color: client?.brand_colors?.secondary || '#4f46e5',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const services = formData.services.split(',').map((s) => s.trim()).filter(Boolean);

    if (isEditing && client) {
      updateClient(client.id, {
        name: formData.name,
        segment: formData.segment,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        website: formData.website,
        instagram: formData.instagram,
        description: formData.description,
        services,
        domain: formData.domain,
        status: formData.status as Client['status'],
        brand_colors: {
          primary: formData.primary_color,
          secondary: formData.secondary_color,
          accent: '#f59e0b',
          background: '#ffffff',
          text: '#1f2937',
        },
      });
    } else {
      addClient(
        {
          name: formData.name,
          segment: formData.segment,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          website: formData.website,
          instagram: formData.instagram,
          description: formData.description,
          services,
          schedule: [{ day: 'Segunda a Sexta', open: '09:00', close: '18:00' }],
          images: [],
          brand_colors: {
            primary: formData.primary_color,
            secondary: formData.secondary_color,
            accent: '#f59e0b',
            background: '#ffffff',
            text: '#1f2937',
          },
          domain: formData.domain,
          status: formData.status as Client['status'],
        },
        user?.tenant_id || 'tenant_001'
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Editar Cliente' : 'Novo Cliente'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Nome da empresa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segmento *</label>
              <select
                required
                value={formData.segment}
                onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="">Selecione</option>
                <option value="Saúde">Saúde</option>
                <option value="Automotivo">Automotivo</option>
                <option value="Gastronomia">Gastronomia</option>
                <option value="Beleza">Beleza</option>
                <option value="Jurídico">Jurídico</option>
                <option value="Educação">Educação</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Imobiliário">Imobiliário</option>
                <option value="Fitness">Fitness</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="(11) 1234-5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="(11) 91234-5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="São Paulo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="SP"
                maxLength={2}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Rua, número, complemento"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="www.exemplo.com.br"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="@empresa"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
                placeholder="Descreva a empresa..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Serviços (separados por vírgula)</label>
              <input
                type="text"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="Serviço 1, Serviço 2, Serviço 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domínio</label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                placeholder="empresa.com.br"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Client['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="draft">Rascunho</option>
                <option value="building">Em construção</option>
                <option value="review">Em revisão</option>
                <option value="published">Publicado</option>
                <option value="maintenance">Manutenção</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cor Primária</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primary_color}
                  onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_color}
                  onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cor Secundária</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.secondary_color}
                  onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                  className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondary_color}
                  onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-500/25"
            >
              {isEditing ? 'Salvar Alterações' : 'Criar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
