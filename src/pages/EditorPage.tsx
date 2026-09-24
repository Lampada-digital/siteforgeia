import { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { useAuthStore } from '../store/authStore';
import {
  Save,
  Eye,
  Type,
  Image,
  Palette,
  Phone,
  Clock,
  List,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';

type TabType = 'content' | 'images' | 'colors' | 'contact' | 'services' | 'schedule';

export default function EditorPage() {
  const { clients } = useClientStore();
  const { user } = useAuthStore();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saved, setSaved] = useState(false);

  const tenantClients = clients.filter((c) => c.tenant_id === user?.tenant_id);
  const selectedClient = tenantClients.find((c) => c.id === selectedClientId);

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'content', label: 'Textos', icon: Type },
    { id: 'images', label: 'Imagens', icon: Image },
    { id: 'colors', label: 'Cores', icon: Palette },
    { id: 'contact', label: 'Contatos', icon: Phone },
    { id: 'services', label: 'Serviços', icon: List },
    { id: 'schedule', label: 'Horários', icon: Clock },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const viewWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editor</h1>
          <p className="text-gray-600 mt-1">Edite os conteúdos do site</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25"
          >
            <Save className="w-4 h-4" />
            {saved ? 'Salvo!' : 'Salvar'}
          </button>
        </div>
      </div>

      {!selectedClient ? (
        /* Client Selection */
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione um site para editar</h3>
          <p className="text-gray-500 mb-6">Escolha um cliente para começar a editar seu site</p>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full max-w-md mx-auto px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          >
            <option value="">Selecione um cliente</option>
            {tenantClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} - {client.segment}
              </option>
            ))}
          </select>
        </div>
      ) : (
        /* Editor Interface */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tabs Sidebar */}
          <div className="bg-white rounded-xl border border-gray-200 p-2">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Editor Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h3>

            {activeTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal (Hero)</label>
                  <input
                    type="text"
                    defaultValue={`Bem-vindo à ${selectedClient.name}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                  <input
                    type="text"
                    defaultValue={selectedClient.description.slice(0, 80)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Texto Sobre Nós</label>
                  <textarea
                    rows={4}
                    defaultValue={selectedClient.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Texto do CTA</label>
                  <input
                    type="text"
                    defaultValue="Agende agora sua consulta"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <Image className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Arraste imagens ou clique para enviar</p>
                  <p className="text-xs text-gray-400">PNG, JPG até 5MB</p>
                  <button className="mt-3 px-4 py-2 bg-violet-100 text-violet-700 text-sm font-medium rounded-lg hover:bg-violet-200">
                    Selecionar Arquivos
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <Image className="w-6 h-6 text-gray-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="space-y-4">
                {Object.entries(selectedClient.brand_colors).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <input
                      type="color"
                      defaultValue={value}
                      className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
                      <input
                        type="text"
                        defaultValue={value}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-xs font-mono"
                      />
                    </div>
                    <div className="w-12 h-12 rounded-lg border border-gray-200" style={{ backgroundColor: value }} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input
                    type="text"
                    defaultValue={selectedClient.phone}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    defaultValue={selectedClient.whatsapp}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                  <input
                    type="text"
                    defaultValue={selectedClient.address}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input
                    type="text"
                    defaultValue={selectedClient.instagram}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-3">
                {selectedClient.services.map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={service}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                    <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      ×
                    </button>
                  </div>
                ))}
                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-violet-300 hover:text-violet-600">
                  + Adicionar Serviço
                </button>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-3">
                {selectedClient.schedule.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      defaultValue={item.day}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                    <input
                      type="time"
                      defaultValue={item.open}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                    <input
                      type="time"
                      defaultValue={item.close}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                ))}
                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-violet-300 hover:text-violet-600">
                  + Adicionar Horário
                </button>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">Preview</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-violet-100 text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-1.5 rounded ${viewMode === 'tablet' ? 'bg-violet-100 text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-violet-100 text-violet-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 min-h-[400px] flex items-start justify-center">
              <div
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all"
                style={{ width: viewWidths[viewMode], maxWidth: '100%' }}
              >
                {/* Mini Preview */}
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ backgroundColor: selectedClient.brand_colors.primary }}
                >
                  <span className="text-white font-bold text-sm">{selectedClient.name}</span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-5/6" />
                  <div className="flex gap-1 mt-3">
                    {selectedClient.services.slice(0, 3).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
