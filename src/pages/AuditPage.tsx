import { useState } from 'react';
import { useClientStore } from '../store/clientStore';
import { useAuthStore } from '../store/authStore';
import {
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Loader2,
  Zap,
  Search,
  Smartphone,
  Eye,
  TrendingUp,
  FileText,
  ArrowRight,
} from 'lucide-react';
import type { AuditScore, AuditIssue } from '../types';

const categoryIcons: Record<string, React.ElementType> = {
  seo: Search,
  performance: Zap,
  mobile: Smartphone,
  accessibility: Eye,
  ux: TrendingUp,
  conversion: TrendingUp,
  content: FileText,
  overall: ShieldCheck,
};

const categoryLabels: Record<string, string> = {
  seo: 'SEO',
  performance: 'Performance',
  mobile: 'Mobile',
  accessibility: 'Acessibilidade',
  ux: 'UX',
  conversion: 'Conversão',
  content: 'Conteúdo',
  overall: 'Geral',
};

export default function AuditPage() {
  const { clients } = useClientStore();
  const { user } = useAuthStore();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<{ score: AuditScore; issues: AuditIssue[] } | null>(null);

  const tenantClients = clients.filter((c) => c.tenant_id === user?.tenant_id);

  const handleAudit = async () => {
    setIsAuditing(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulated audit results
    const mockScore: AuditScore = {
      seo: 82,
      performance: 74,
      mobile: 91,
      accessibility: 68,
      ux: 85,
      conversion: 72,
      content: 88,
      overall: 80,
    };

    const mockIssues: AuditIssue[] = [
      {
        id: '1',
        category: 'seo',
        severity: 'warning',
        title: 'Meta description muito longa',
        description: 'A meta description possui 187 caracteres. O ideal é manter entre 120-160.',
        suggestion: 'Reduza a meta description para no máximo 160 caracteres.',
        auto_fixable: true,
      },
      {
        id: '2',
        category: 'performance',
        severity: 'critical',
        title: 'Imagens sem compressão',
        description: 'Foram detectadas 5 imagens acima de 500KB sem otimização.',
        suggestion: 'Comprima as imagens e utilize formato WebP para melhor performance.',
        auto_fixable: true,
      },
      {
        id: '3',
        category: 'accessibility',
        severity: 'critical',
        title: 'Imagens sem alt text',
        description: '3 imagens não possuem atributo alt para acessibilidade.',
        suggestion: 'Adicione textos alternativos descritivos em todas as imagens.',
        auto_fixable: true,
      },
      {
        id: '4',
        severity: 'warning',
        category: 'conversion',
        title: 'CTA pouco visível',
        description: 'O botão de call-to-action principal não possui contraste suficiente.',
        suggestion: 'Aumente o contraste do CTA ou reposicione para área mais visível.',
        auto_fixable: false,
      },
      {
        id: '5',
        category: 'seo',
        severity: 'info',
        title: 'Schema markup ausente',
        description: 'Não foi encontrado schema markup para o tipo de negócio.',
        suggestion: 'Adicione schema LocalBusiness para melhorar o SEO local.',
        auto_fixable: true,
      },
      {
        id: '6',
        category: 'mobile',
        severity: 'warning',
        title: 'Texto muito pequeno',
        description: '2 elementos possuem fonte menor que 12px em dispositivos móveis.',
        suggestion: 'Aumente o tamanho da fonte para no mínimo 14px em mobile.',
        auto_fixable: true,
      },
    ];

    setAuditResult({ score: mockScore, issues: mockIssues });
    setIsAuditing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Auditoria</h1>
        <p className="text-gray-600 mt-1">
          Analise e otimize a qualidade dos sites
        </p>
      </div>

      {/* Client Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Selecione o site para auditar
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => {
                setSelectedClientId(e.target.value);
                setAuditResult(null);
              }}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            >
              <option value="">Selecione um site</option>
              {tenantClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} - {client.segment}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAudit}
            disabled={!selectedClientId || isAuditing}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/25 text-sm"
          >
            {isAuditing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Auditando...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Iniciar Auditoria
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results */}
      {auditResult && (
        <>
          {/* Overall Score */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Score Geral</h3>
              <span className={`text-3xl font-bold ${getScoreColor(auditResult.score.overall)}`}>
                {auditResult.score.overall}/100
              </span>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {Object.entries(auditResult.score)
                .filter(([key]) => key !== 'overall')
                .map(([key, value]) => {
                  const Icon = categoryIcons[key] || ShieldCheck;
                  return (
                    <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className={`text-lg font-bold ${getScoreColor(value)}`}>{value}</p>
                      <p className="text-xs text-gray-500">{categoryLabels[key]}</p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Issues */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Problemas Detectados ({auditResult.issues.length})
              </h3>
              <button className="flex items-center gap-1 text-sm text-violet-600 hover:text-violet-700 font-medium">
                Corrigir Automaticamente
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {auditResult.issues.map((issue) => (
                <div
                  key={issue.id}
                  className={`p-4 rounded-lg border ${
                    issue.severity === 'critical'
                      ? 'border-red-200 bg-red-50/50'
                      : issue.severity === 'warning'
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-blue-200 bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-gray-900">{issue.title}</h4>
                        <span className="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded capitalize">
                          {categoryLabels[issue.category]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-gray-500">
                          <strong>Sugestão:</strong> {issue.suggestion}
                        </p>
                        {issue.auto_fixable && (
                          <button className="flex items-center gap-1 text-xs text-violet-600 hover:text-violet-700 font-medium whitespace-nowrap">
                            <Zap className="w-3 h-3" />
                            Auto-fix
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-700">
                  {auditResult.issues.filter((i) => i.severity === 'critical').length}
                </p>
                <p className="text-xs text-red-600">Críticos</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-2xl font-bold text-amber-700">
                  {auditResult.issues.filter((i) => i.severity === 'warning').length}
                </p>
                <p className="text-xs text-amber-600">Avisos</p>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-700">
                  {auditResult.issues.filter((i) => i.auto_fixable).length}
                </p>
                <p className="text-xs text-green-600">Auto-corrigíveis</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
