import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Client } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ClientState {
  clients: Client[];
  selectedClient: Client | null;
  addClient: (client: Omit<Client, 'id' | 'tenant_id' | 'created_at' | 'updated_at'>, tenantId: string) => void;
  updateClient: (id: string, data: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  selectClient: (client: Client | null) => void;
  getClientsByTenant: (tenantId: string) => Client[];
}

const SAMPLE_CLIENTS: Client[] = [
  {
    id: 'cl_001',
    tenant_id: 'tenant_001',
    name: 'Clínica Bem Estar',
    segment: 'Saúde',
    phone: '(11) 3456-7890',
    whatsapp: '(11) 99876-5432',
    address: 'Av. Paulista, 1234 - Sala 56',
    city: 'São Paulo',
    state: 'SP',
    website: 'www.clinicabemestar.com.br',
    instagram: '@clinicabemestar',
    description: 'Clínica multidisciplinar especializada em fisioterapia, nutrição e psicologia. Atendemos com excelência há mais de 10 anos.',
    services: ['Fisioterapia', 'Nutrição', 'Psicologia', 'Pilates', 'Acupuntura'],
    schedule: [
      { day: 'Segunda a Sexta', open: '07:00', close: '20:00' },
      { day: 'Sábado', open: '08:00', close: '14:00' },
    ],
    images: [],
    brand_colors: {
      primary: '#059669',
      secondary: '#0d9488',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
    },
    domain: 'clinicabemestar.com.br',
    status: 'published',
    created_at: '2024-06-15T10:00:00Z',
    updated_at: '2024-12-01T14:30:00Z',
  },
  {
    id: 'cl_002',
    tenant_id: 'tenant_001',
    name: 'Auto Center Veloz',
    segment: 'Automotivo',
    phone: '(11) 2345-6789',
    whatsapp: '(11) 98765-4321',
    address: 'Rua das Oficinas, 456',
    city: 'Guarulhos',
    state: 'SP',
    instagram: '@autocenterveloz',
    description: 'Mecânica especializada em todas as marcas. Serviços de alinhamento, balanceamento, troca de óleo e revisão completa.',
    services: ['Mecânica Geral', 'Alinhamento', 'Balanceamento', 'Troca de Óleo', 'Freios', 'Suspensão'],
    schedule: [
      { day: 'Segunda a Sexta', open: '08:00', close: '18:00' },
      { day: 'Sábado', open: '08:00', close: '13:00' },
    ],
    images: [],
    brand_colors: {
      primary: '#dc2626',
      secondary: '#1e40af',
      accent: '#f97316',
      background: '#ffffff',
      text: '#111827',
    },
    status: 'building',
    created_at: '2024-09-20T09:00:00Z',
    updated_at: '2024-12-10T11:00:00Z',
  },
  {
    id: 'cl_003',
    tenant_id: 'tenant_001',
    name: 'Restaurante Sabor da Terra',
    segment: 'Gastronomia',
    phone: '(11) 4567-8901',
    whatsapp: '(11) 97654-3210',
    address: 'Rua das Flores, 789',
    city: 'Campinas',
    state: 'SP',
    instagram: '@sabordaterra',
    description: 'Cuisine brasileira contemporânea com ingredientes orgânicos e locais. Ambiente acolhedor para famílias e eventos.',
    services: ['Almoço Executivo', 'Jantar', 'Eventos', 'Delivery', 'Catering'],
    schedule: [
      { day: 'Terça a Domingo', open: '11:30', close: '23:00' },
    ],
    images: [],
    brand_colors: {
      primary: '#b45309',
      secondary: '#15803d',
      accent: '#e11d48',
      background: '#fffbeb',
      text: '#292524',
    },
    domain: 'sabordaterra.com.br',
    status: 'review',
    created_at: '2024-10-05T15:00:00Z',
    updated_at: '2024-12-12T16:45:00Z',
  },
  {
    id: 'cl_004',
    tenant_id: 'tenant_001',
    name: 'Studio Hair Elegance',
    segment: 'Beleza',
    phone: '(11) 5678-9012',
    whatsapp: '(11) 96543-2109',
    address: 'Shopping Center Norte, Loja 23',
    city: 'São Paulo',
    state: 'SP',
    instagram: '@studiohairelegance',
    description: 'Salão de beleza premium especializado em coloração, tratamentos capilares e estética facial.',
    services: ['Corte Feminino', 'Corte Masculino', 'Coloração', 'Tratamentos', 'Manicure', 'Estética Facial'],
    schedule: [
      { day: 'Segunda a Sexta', open: '09:00', close: '20:00' },
      { day: 'Sábado', open: '09:00', close: '18:00' },
    ],
    images: [],
    brand_colors: {
      primary: '#9333ea',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#fdf4ff',
      text: '#1f2937',
    },
    status: 'draft',
    created_at: '2024-11-28T13:00:00Z',
    updated_at: '2024-12-14T10:20:00Z',
  },
  {
    id: 'cl_005',
    tenant_id: 'tenant_001',
    name: 'Escritório Advocacia Silva & Associados',
    segment: 'Jurídico',
    phone: '(11) 6789-0123',
    whatsapp: '(11) 95432-1098',
    address: 'Av. Faria Lima, 3477 - 12º andar',
    city: 'São Paulo',
    state: 'SP',
    website: 'www.silvaassociados.adv.br',
    description: 'Escritório de advocacia com atuação em direito empresarial, trabalhista e tributário. Mais de 20 anos de experiência.',
    services: ['Direito Empresarial', 'Direito Trabalhista', 'Direito Tributário', 'Contratos', 'Consultoria'],
    schedule: [
      { day: 'Segunda a Sexta', open: '09:00', close: '18:00' },
    ],
    images: [],
    brand_colors: {
      primary: '#1e3a5f',
      secondary: '#b8860b',
      accent: '#4a5568',
      background: '#ffffff',
      text: '#1a202c',
    },
    domain: 'silvaassociados.adv.br',
    status: 'published',
    created_at: '2024-03-10T08:00:00Z',
    updated_at: '2024-11-20T09:15:00Z',
  },
];

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      clients: SAMPLE_CLIENTS,
      selectedClient: null,

      addClient: (clientData, tenantId) => {
        const newClient: Client = {
          ...clientData,
          id: 'cl_' + uuidv4().slice(0, 8),
          tenant_id: tenantId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        set((state) => ({ clients: [...state.clients, newClient] }));
      },

      updateClient: (id, data) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, ...data, updated_at: new Date().toISOString() } : c
          ),
          selectedClient:
            state.selectedClient?.id === id
              ? { ...state.selectedClient, ...data, updated_at: new Date().toISOString() }
              : state.selectedClient,
        }));
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
          selectedClient: state.selectedClient?.id === id ? null : state.selectedClient,
        }));
      },

      selectClient: (client) => set({ selectedClient: client }),

      getClientsByTenant: (tenantId) => {
        return get().clients.filter((c) => c.tenant_id === tenantId);
      },
    }),
    {
      name: 'siteforge-clients',
    }
  )
);
