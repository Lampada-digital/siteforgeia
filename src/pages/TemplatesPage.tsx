import { useState } from 'react';
import { Eye, Sparkles, Lock, Check } from 'lucide-react';
import type { SiteTemplate } from '../types';

const templates: SiteTemplate[] = [
  {
    id: 'tpl_001',
    name: 'Corporate Pro',
    category: 'Corporativo',
    description: 'Template profissional para empresas de serviços corporativos, consultorias e escritórios.',
    thumbnail: '',
    segments: ['Jurídico', 'Consultoria', 'Financeiro'],
    components: ['Hero', 'About', 'Services', 'Team', 'Testimonials', 'Contact', 'Footer'],
    is_premium: false,
  },
  {
    id: 'tpl_002',
    name: 'Health & Wellness',
    category: 'Saúde',
    description: 'Design limpo e acolhedor para clínicas, consultórios e profissionais de saúde.',
    thumbnail: '',
    segments: ['Saúde', 'Bem-estar', 'Fitness'],
    components: ['Hero', 'About', 'Services', 'Team', 'FAQ', 'Contact', 'Footer'],
    is_premium: false,
  },
  {
    id: 'tpl_003',
    name: 'Foodie Delight',
    category: 'Gastronomia',
    description: 'Visual apetitoso para restaurantes, cafés, padarias e delivery.',
    thumbnail: '',
    segments: ['Gastronomia', 'Delivery', 'Café'],
    components: ['Hero', 'Menu', 'Gallery', 'About', 'Testimonials', 'Contact', 'Footer'],
    is_premium: false,
  },
  {
    id: 'tpl_004',
    name: 'Beauty Studio',
    category: 'Beleza',
    description: 'Elegante e moderno para salões de beleza, barbearias e spas.',
    thumbnail: '',
    segments: ['Beleza', 'Estética', 'Spa'],
    components: ['Hero', 'Services', 'Gallery', 'Pricing', 'Team', 'Booking', 'Footer'],
    is_premium: true,
  },
  {
    id: 'tpl_005',
    name: 'Auto Service',
    category: 'Automotivo',
    description: 'Robusto e confiável para oficinas, auto centers e concessionárias.',
    thumbnail: '',
    segments: ['Automotivo', 'Mecânica', 'Concessionária'],
    components: ['Hero', 'Services', 'Brands', 'About', 'Testimonials', 'Contact', 'Footer'],
    is_premium: false,
  },
  {
    id: 'tpl_006',
    name: 'Real Estate',
    category: 'Imobiliário',
    description: 'Sofisticado para imobiliárias, corretores e construtoras.',
    thumbnail: '',
    segments: ['Imobiliário', 'Construção', 'Arquitetura'],
    components: ['Hero', 'Featured', 'Search', 'About', 'Testimonials', 'Contact', 'Footer'],
    is_premium: true,
  },
  {
    id: 'tpl_007',
    name: 'Tech Startup',
    category: 'Tecnologia',
    description: 'Moderno e dinâmico para startups, SaaS e empresas de tecnologia.',
    thumbnail: '',
    segments: ['Tecnologia', 'SaaS', 'Startup'],
    components: ['Hero', 'Features', 'Pricing', 'Testimonials', 'FAQ', 'CTA', 'Footer'],
    is_premium: true,
  },
  {
    id: 'tpl_008',
    name: 'Education Hub',
    category: 'Educação',
    description: 'Organizado e inspirador para escolas, cursos e plataformas educacionais.',
    thumbnail: '',
    segments: ['Educação', 'Cursos', 'Treinamento'],
    components: ['Hero', 'Courses', 'About', 'Teachers', 'Testimonials', 'Contact', 'Footer'],
    is_premium: false,
  },
];

const categoryColors: Record<string, string> = {
  Corporativo: 'from-blue-500 to-indigo-600',
  Saúde: 'from-green-500 to-emerald-600',
  Gastronomia: 'from-orange-500 to-red-600',
  Beleza: 'from-pink-500 to-rose-600',
  Automotivo: 'from-gray-600 to-slate-800',
  Imobiliário: 'from-amber-500 to-yellow-600',
  Tecnologia: 'from-violet-500 to-purple-600',
  Educação: 'from-cyan-500 to-blue-600',
};

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewTemplate, setPreviewTemplate] = useState<SiteTemplate | null>(null);

  const categories = ['all', ...new Set(templates.map((t) => t.category))];
  
  const filtered = selectedCategory === 'all'
    ? templates
    : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-600 mt-1">
          Escolha um template como base para criar sites profissionais
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-violet-100 text-violet-700 border border-violet-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group"
          >
            {/* Preview */}
            <div className={`h-40 bg-gradient-to-br ${categoryColors[template.category] || 'from-gray-400 to-gray-600'} relative flex items-center justify-center`}>
              <div className="text-center text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium opacity-90">{template.category}</p>
              </div>
              {template.is_premium && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  <Lock className="w-3 h-3" />
                  Premium
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  Visualizar
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{template.description}</p>
              
              {/* Segments */}
              <div className="flex flex-wrap gap-1 mt-3">
                {template.segments.map((seg) => (
                  <span key={seg} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    {seg}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Detalhes
                </button>
                <button className="flex-1 px-3 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all">
                  Usar Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className={`h-48 bg-gradient-to-br ${categoryColors[previewTemplate.category] || 'from-gray-400 to-gray-600'} rounded-t-2xl flex items-center justify-center relative`}>
              <div className="text-center text-white">
                <Sparkles className="w-10 h-10 mx-auto mb-2" />
                <p className="text-lg font-bold">{previewTemplate.name}</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{previewTemplate.name}</h3>
              <p className="text-gray-600 mt-2">{previewTemplate.description}</p>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Componentes:</p>
                <div className="flex flex-wrap gap-1.5">
                  {previewTemplate.components.map((comp) => (
                    <span key={comp} className="flex items-center gap-1 px-2 py-1 bg-violet-50 text-violet-700 rounded text-xs font-medium">
                      <Check className="w-3 h-3" />
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Segmentos:</p>
                <div className="flex flex-wrap gap-1.5">
                  {previewTemplate.segments.map((seg) => (
                    <span key={seg} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {seg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                >
                  Fechar
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-violet-700 hover:to-indigo-700">
                  Usar Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
