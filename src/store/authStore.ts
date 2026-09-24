import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Tenant } from '../types';

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  setTenant: (tenant: Tenant) => void;
}

// Simulated users for demo
const DEMO_USERS: Record<string, { password: string; user: User; tenant: Tenant }> = {
  'admin@siteforge.ai': {
    password: 'admin123',
    user: {
      id: 'usr_001',
      email: 'admin@siteforge.ai',
      name: 'Carlos Admin',
      role: 'admin',
      tenant_id: 'tenant_001',
      created_at: '2024-01-01T00:00:00Z',
    },
    tenant: {
      id: 'tenant_001',
      name: 'SiteForge AI',
      plan: 'enterprise',
      plan_status: 'active',
      mrr: 4970,
      created_at: '2024-01-01T00:00:00Z',
    },
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tenant: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const demoUser = DEMO_USERS[email];
        if (demoUser && demoUser.password === password) {
          set({
            user: demoUser.user,
            tenant: demoUser.tenant,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }
        
        // Allow any login for demo purposes
        const mockUser: User = {
          id: 'usr_' + Date.now(),
          email,
          name: email.split('@')[0],
          role: 'admin',
          tenant_id: 'tenant_001',
          created_at: new Date().toISOString(),
        };
        const mockTenant: Tenant = {
          id: 'tenant_001',
          name: 'Minha Agência',
          plan: 'professional',
          plan_status: 'active',
          mrr: 997,
          created_at: new Date().toISOString(),
        };
        
        set({
          user: mockUser,
          tenant: mockTenant,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      },

      logout: () => {
        set({
          user: null,
          tenant: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setUser: (user: User) => set({ user }),
      setTenant: (tenant: Tenant) => set({ tenant }),
    }),
    {
      name: 'siteforge-auth',
    }
  )
);
