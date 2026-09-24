import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  Clock,
  Globe,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const trafficData = [
  { date: '01/12', visits: 120, unique: 89 },
  { date: '02/12', visits: 145, unique: 102 },
  { date: '03/12', visits: 132, unique: 98 },
  { date: '04/12', visits: 178, unique: 134 },
  { date: '05/12', visits: 195, unique: 156 },
  { date: '06/12', visits: 167, unique: 128 },
  { date: '07/12', visits: 210, unique: 167 },
  { date: '08/12', visits: 234, unique: 189 },
  { date: '09/12', visits: 198, unique: 156 },
  { date: '10/12', visits: 256, unique: 198 },
  { date: '11/12', visits: 278, unique: 212 },
  { date: '12/12', visits: 312, unique: 245 },
];

const sourceData = [
  { name: 'Google', value: 45, color: '#8b5cf6' },
  { name: 'Direto', value: 25, color: '#06b6d4' },
  { name: 'Instagram', value: 18, color: '#ec4899' },
  { name: 'Facebook', value: 8, color: '#3b82f6' },
  { name: 'Outros', value: 4, color: '#6b7280' },
];

const topSitesData = [
  { name: 'Clínica Bem Estar', visits: 1245, conversion: 4.2 },
  { name: 'Silva & Associados', visits: 987, conversion: 3.8 },
  { name: 'Sabor da Terra', visits: 856, conversion: 5.1 },
  { name: 'Auto Center Veloz', visits: 654, conversion: 2.9 },
  { name: 'Studio Hair', visits: 543, conversion: 3.5 },
];

const performanceData = [
  { name: 'TTFB', value: 120, unit: 'ms' },
  { name: 'FCP', value: 1.2, unit: 's' },
  { name: 'LCP', value: 2.1, unit: 's' },
  { name: 'CLS', value: 0.05, unit: '' },
  { name: 'FID', value: 45, unit: 'ms' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Métricas de todos os sites publicados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.287</p>
              <p className="text-xs text-gray-500">Visitas (30 dias)</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3.124</p>
              <p className="text-xs text-gray-500">Visitantes únicos</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">3.9%</p>
              <p className="text-xs text-gray-500">Taxa de conversão</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">2:34</p>
              <p className="text-xs text-gray-500">Tempo médio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Tráfego</h3>
              <p className="text-sm text-gray-500">Últimos 12 dias</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-violet-500 rounded-full" />
                Visitas
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                Únicos
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="visits" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
              <Area type="monotone" dataKey="unique" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorUnique)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Fontes de Tráfego</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {sourceData.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                  {source.name}
                </span>
                <span className="font-medium text-gray-700">{source.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sites */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            Sites Mais Visitados
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topSitesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" width={120} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="visits" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            Core Web Vitals (Média)
          </h3>
          <div className="space-y-4">
            {performanceData.map((metric) => {
              const maxValues: Record<string, number> = { TTFB: 300, FCP: 3, LCP: 4, CLS: 0.25, FID: 200 };
              const percentage = (metric.value / maxValues[metric.name]) * 100;
              const isGood = percentage < 50;
              return (
                <div key={metric.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                    <span className="text-sm text-gray-600">
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${isGood ? 'bg-green-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
