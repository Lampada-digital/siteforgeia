import { useAuthStore } from '../store/authStore';
import {
  CreditCard,
  Check,
  Zap,
  Crown,
  Building2,
  ArrowRight,
} from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 297,
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Até 10 sites',
      'Até 20 clientes',
      'Templates básicos',
      'Gerador IA (20/mês)',
      'Auditoria básica',
      'Suporte por e-mail',
    ],
    limitations: [
      'Sem domínio personalizado',
      'Sem white-label',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 597,
    icon: Crown,
    color: 'from-violet-500 to-indigo-500',
    popular: true,
    features: [
      'Até 50 sites',
      'Até 100 clientes',
      'Todos os templates',
      'Gerador IA (100/mês)',
      'Auditoria completa',
      'Domínio personalizado',
      'Editor avançado',
      'Suporte prioritário',
    ],
    limitations: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 997,
    icon: Building2,
    color: 'from-amber-500 to-orange-500',
    features: [
      'Sites ilimitados',
      'Clientes ilimitados',
      'Todos os templates + premium',
      'Gerador IA ilimitado',
      'Auditoria avançada',
      'Domínios ilimitados',
      'Editor avançado + API',
      'White-label completo',
      'Suporte dedicado 24/7',
      'Deploy automatizado',
      'Analytics avançado',
    ],
    limitations: [],
  },
];

export default function BillingPage() {
  const { tenant } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Planos & Cobrança</h1>
        <p className="text-gray-600 mt-1">Gerencie sua assinatura e plano</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-violet-200 text-sm">Plano Atual</p>
            <h3 className="text-2xl font-bold capitalize">{tenant?.plan}</h3>
            <p className="text-violet-200 text-sm mt-1">
              R$ {tenant?.mrr?.toLocaleString('pt-BR')}/mês • Status: Ativo
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg hover:bg-white/30 border border-white/30">
              Gerenciar Pagamento
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Escolha seu Plano</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const isCurrentPlan = tenant?.plan === plan.id;
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-xl border-2 p-6 transition-all ${
                  plan.popular
                    ? 'border-violet-500 shadow-lg shadow-violet-500/10'
                    : isCurrentPlan
                    ? 'border-green-500'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-violet-600 text-white text-xs font-medium rounded-full">
                    Mais Popular
                  </span>
                )}
                {isCurrentPlan && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full">
                    Plano Atual
                  </span>
                )}

                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h4 className="text-lg font-bold text-gray-900">{plan.name}</h4>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    R$ {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">/mês</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <li key={limitation} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="w-4 h-4 flex items-center justify-center mt-0.5 flex-shrink-0">✕</span>
                      {limitation}
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isCurrentPlan}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isCurrentPlan
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg shadow-violet-500/25'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {isCurrentPlan ? (
                    'Plano Atual'
                  ) : (
                    <>
                      Fazer Upgrade
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-gray-500" />
          Informações de Pagamento
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Próxima cobrança</p>
            <p className="text-sm font-medium text-gray-900">05/01/2025</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Método de pagamento</p>
            <p className="text-sm font-medium text-gray-900">Cartão •••• 4242</p>
          </div>
        </div>
      </div>
    </div>
  );
}
