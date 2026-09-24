import { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { useAuthStore } from '../store/authStore';
import {
  Rocket,
  Globe,
  GitBranch,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

export default function DeployPage() {
  const { clients } = useClientStore();
  const { user } = useAuthStore();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const tenantClients = clients.filter((c) => c.tenant_id === user?.tenant_id);
  const selectedClient = tenantClients.find((c) => c.id === selectedClientId);

  const handleDeploy = async () => {
    setDeploying(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setDeploying(false);
    setDeployed(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Deploy</h1>
        <p className="text-gray-600 mt-1">Publique seus sites com domínio personalizado</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deploy Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-violet-500" />
            Configurar Deploy
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Site</label>
              <select
                value={selectedClientId}
                onChange={(e) => {
                  setSelectedClientId(e.target.value);
                  setDeployed(false);
                }}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              >
                <option value="">Selecione um site</option>
                {tenantClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Domínio</label>
              <input
                type="text"
                defaultValue={selectedClient?.domain || ''}
                placeholder="seudominio.com.br"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Configure os registros DNS apontando para os servidores da plataforma.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Plataforma de Deploy:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <GitBranch className="w-4 h-4 text-gray-400" />
                  GitHub - Repositório conectado
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Rocket className="w-4 h-4 text-gray-400" />
                  Vercel - Deploy automático
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4 text-gray-400" />
                  SSL - Certificado automático
                </div>
              </div>
            </div>

            <button
              onClick={handleDeploy}
              disabled={!selectedClientId || deploying}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 text-sm"
            >
              {deploying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Publicar Site
                </>
              )}
            </button>
          </div>
        </div>

        {/* Deploy Status */}
        <div className="space-y-5">
          {deployed ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <div>
                  <h4 className="font-semibold text-green-800">Deploy Realizado!</h4>
                  <p className="text-sm text-green-600">O site está publicado e acessível</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">URL</span>
                  <a href="#" className="text-sm text-violet-600 font-medium flex items-center gap-1">
                    {selectedClient?.domain || 'site.vercel.app'}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className="text-sm text-green-600 font-medium">● Online</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">SSL</span>
                  <span className="text-sm text-green-600 font-medium">Ativo</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg">
                  <span className="text-sm text-gray-600">Último deploy</span>
                  <span className="text-sm text-gray-600">Agora</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Status do Deploy</h3>
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  {selectedClientId ? 'Clique em "Publicar Site" para iniciar o deploy' : 'Selecione um site para ver o status'}
                </p>
              </div>
            </div>
          )}

          {/* Deploy History */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Histórico de Deploys</h3>
            <div className="space-y-3">
              {[
                { version: 'v1.3.2', time: '2 horas atrás', status: 'success' },
                { version: 'v1.3.1', time: '1 dia atrás', status: 'success' },
                { version: 'v1.3.0', time: '3 dias atrás', status: 'success' },
                { version: 'v1.2.9', time: '1 semana atrás', status: 'failed' },
              ].map((deploy, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {deploy.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium text-gray-900">{deploy.version}</span>
                  </div>
                  <span className="text-xs text-gray-500">{deploy.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
