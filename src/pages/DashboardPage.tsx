import { useClientStore } from '../store/clientStore';
import { useAuthStore } from '../store/authStore';
import {
  Users,
  Globe,
  Rocket,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const revenueData = [
  { month: 'Jul', value: 2800 },
  { month: 'Ago', value: 3200 },
  { month: 'Set', value: 3600 },
  { month: 'Out', value: 3900 },
  { month: 'Nov', value: 4400 },
  { month: 'Dez', value: 4970 },
];

const sitesData = [
  { month: 'Jul', sites: 8 },
  { month: 'Ago', sites: 12 },
  { month: 'Set', sites: 15 },
  { month: 'Out', sites: 22 },
  { month: 'Nov', sites: 28 },
  { month: 'Dez', sites: 35 },
];

const recentActivity = [
  { id: '1', type: 'site_published', title: 'Site publicado', description: 'Clínica Bem Estar foi publicado com sucesso', time: '2 min atrás', icon: Rocket, color: 'text-green-500', bg: 'bg-green-50' },
  { id: '2', type: 'client_added', title: 'Novo cliente', description: 'Studio Hair Elegance adicionado', time: '1 hora atrás', icon: Users, color: 'text-violet-500', bg: 'bg-violet-50' },
  { id: '3', type: 'audit_completed', title: 'Auditoria concluída', description: 'Restaurante Sabor da Terra - Score: 87/100', time: '3 horas atrás', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: '4', type: 'domain_connected', title: 'Domínio conectado', description: 'silvaassociados.adv.br vinculado', time: '5 horas atrás', icon: Globe, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: '5', type: 'site_created', title: 'Site gerado', description: 'Auto Center Veloz - Template Gerado por IA', time: '1 dia atrás', icon: TrendingUp, color: 'text-pink-500', bg: 'bg-pink-50' },
];

export default function DashboardPage() {
  const { clients } = useClientStore();
  const { tenant } = useAuthStore();

  const publishedSites = clients.filter((c) => c.status === 'published').length;
  const inProduction = clients.filter((c) => c.status === 'building' || c.status === 'review').length;

  const stats = [
    {
      label: 'Total de Clientes',
      value: clients.length,
      change: '+12%',
      positive: true,
      icon: Users,
      color: 'from-violet-500 to-indigo-500',
    },
    {
      label: 'Sites Publicados',
      value: publishedSites,
      change: '+8%',
      positive: true,
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'Em Produção',
      value: inProduction,
      change: '+23%',
      positive: true,
      icon: Rocket,
      color: 'from-amber-500 to-orange-500',
    },
    {
      label: 'MRR',
      value: `R$ ${tenant?.mrr?.toLocaleString('pt-BR') || '0'}`,
      change: '+18%',
      positive: true,
      icon: DollarSign,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral da sua operação</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Receita Recorrente</h3>
              <p className="text-sm text-gray-500">Últimos 6 meses</p>
            </div>
            <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full">
              +77% crescimento
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
                formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sites Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Sites Criados</h3>
              <p className="text-sm text-gray-500">Evolução mensal</p>
            </div>
            <span className="text-xs font-medium bg-violet-50 text-violet-700 px-2 py-1 rounded-full">
              +337% crescimento
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={sitesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="sites" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-9 h-9 ${activity.bg} rounded-lg flex items-center justify-center`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Resumo Rápido</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Plano Atual</span>
              <span className="text-sm font-semibold text-violet-600 capitalize">
                {tenant?.plan}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Sites no limite</span>
              <span className="text-sm font-semibold text-gray-900">
                {clients.length}/50
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Domínios ativos</span>
              <span className="text-sm font-semibold text-gray-900">
                {clients.filter((c) => c.domain).length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Status da conta</span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Ativo
              </span>
            </div>
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Uso de IA</span>
                <span className="text-xs text-gray-500">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-2 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
