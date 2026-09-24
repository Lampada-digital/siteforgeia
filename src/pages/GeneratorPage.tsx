import { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { useAuthStore } from '../store/authStore';
import {
  Wand2,
  Sparkles,
  Loader2,
  CheckCircle2,
  FileText,
  Palette,
  Search,
  Code2,
  Image,
  MessageSquare,
} from 'lucide-react';
import type { Client } from '../types';

interface GenerationStep {
  id: string;
  label: string;
  icon: React.ElementType;
  status: 'pending' | 'running' | 'done';
}

export default function GeneratorPage() {
  const { clients } = useClientStore();
  const { user } = useAuthStore();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [steps, setSteps] = useState<GenerationStep[]>([
    { id: 'structure', label: 'Analisando estrutura do segmento', icon: FileText, status: 'pending' },
    { id: 'content', label: 'Gerando textos e CTAs', icon: MessageSquare, status: 'pending' },
    { id: 'seo', label: 'Otimizando SEO e metadata', icon: Search, status: 'pending' },
    { id: 'visual', label: 'Aplicando identidade visual', icon: Palette, status: 'pending' },
    { id: 'components', label: 'Montando componentes', icon: Code2, status: 'pending' },
    { id: 'images', label: 'Selecionando imagens', icon: Image, status: 'pending' },
  ]);

  const tenantClients = clients.filter((c) => c.tenant_id === user?.tenant_id);

  const handleGenerate = async () => {
    if (!selectedClient) return;
    
    setIsGenerating(true);
    setGenerationComplete(false);

    // Simulate AI generation steps
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSteps((prev) =>
        prev.map((step, idx) => ({
          ...step,
          status: idx < i ? 'done' : idx === i ? 'running' : 'pending',
        }))
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    setSteps((prev) => prev.map((step) => ({ ...step, status: 'done' as const })));
    setIsGenerating(false);
    setGenerationComplete(true);
  };

  const resetGeneration = () => {
    setGenerationComplete(false);
    setSelectedClient(null);
    setSelectedTemplate('');
    setSteps((prev) => prev.map((step) => ({ ...step, status: 'pending' as const })));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerador IA</h1>
        <p className="text-gray-600 mt-1">
          Gere sites completos com inteligência artificial
        </p>
      </div>

      {!generationComplete ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-violet-500" />
                Configuração da Geração
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cliente *
                  </label>
                  <select
                    value={selectedClient?.id || ''}
                    onChange={(e) =>
                      setSelectedClient(
                        tenantClients.find((c) => c.id === e.target.value) || null
                      )
                    }
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="">Selecione um cliente</option>
                    {tenantClients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} - {client.segment}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Template Base *
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value="">Selecione um template</option>
                    <option value="corporate">Corporate Pro</option>
                    <option value="health">Health & Wellness</option>
                    <option value="foodie">Foodie Delight</option>
                    <option value="beauty">Beauty Studio</option>
                    <option value="auto">Auto Service</option>
                    <option value="realestate">Real Estate</option>
                    <option value="tech">Tech Startup</option>
                    <option value="education">Education Hub</option>
                  </select>
                </div>

                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
                  <p className="text-sm text-violet-700">
                    <strong>O que será gerado:</strong> Estrutura completa, textos persuasivos, 
                    CTAs otimizados, SEO on-page, schema markup, identidade visual adaptada, 
                    componentes responsivos, FAQ inteligente e metadata completa.
                  </p>
                </div>
              </div>
            </div>

            {/* Generation Steps */}
            {isGenerating && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Progresso da Geração</h3>
                <div className="space-y-3">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        step.status === 'done'
                          ? 'bg-green-50'
                          : step.status === 'running'
                          ? 'bg-violet-50'
                          : 'bg-gray-50'
                      }`}
                    >
                      {step.status === 'done' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : step.status === 'running' ? (
                        <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
                      ) : (
                        <step.icon className="w-5 h-5 text-gray-400" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          step.status === 'done'
                            ? 'text-green-700'
                            : step.status === 'running'
                            ? 'text-violet-700'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Client Preview */}
            {selectedClient && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Cliente Selecionado</h4>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">{selectedClient.name}</p>
                  <p className="text-xs text-gray-500">{selectedClient.segment}</p>
                  <p className="text-xs text-gray-500">{selectedClient.city}, {selectedClient.state}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedClient.services.slice(0, 4).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border border-violet-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-violet-500" />
                <h4 className="text-sm font-semibold text-gray-900">Pronto para gerar?</h4>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                O sistema utilizará os dados do cliente e o template selecionado para criar um site completo e otimizado.
              </p>
              <button
                onClick={handleGenerate}
                disabled={!selectedClient || !selectedTemplate || isGenerating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 text-sm"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Gerar Site com IA
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Generation Complete */
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Gerado com Sucesso!</h2>
          <p className="text-gray-600 mb-8">
            O site para <strong>{selectedClient?.name}</strong> foi criado com sucesso. 
            Você pode editá-lo, auditar ou publicar agora.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25 text-sm">
              Ir para o Editor
            </button>
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm">
              Executar Auditoria
            </button>
            <button
              onClick={resetGeneration}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm"
            >
              Gerar Outro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
