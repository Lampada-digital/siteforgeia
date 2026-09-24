// ==========================================
// SITEFORGE AI - Type Definitions
// ==========================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  tenant_id: string;
  avatar_url?: string;
  created_at: string;
}

export interface Tenant {
  id: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  plan_status: 'active' | 'trial' | 'past_due' | 'cancelled';
  mrr: number;
  created_at: string;
}

export interface Client {
  id: string;
  tenant_id: string;
  name: string;
  segment: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  website?: string;
  instagram?: string;
  description: string;
  services: string[];
  schedule: ScheduleItem[];
  images: string[];
  brand_colors: BrandColors;
  domain?: string;
  status: 'draft' | 'building' | 'review' | 'published' | 'maintenance';
  created_at: string;
  updated_at: string;
}

export interface ScheduleItem {
  day: string;
  open: string;
  close: string;
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface SiteTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  segments: string[];
  components: string[];
  is_premium: boolean;
}

export interface GeneratedSite {
  id: string;
  client_id: string;
  tenant_id: string;
  template_id: string;
  sections: SiteSection[];
  seo: SEOData;
  schema_markup: string;
  metadata: Metadata;
  created_at: string;
}

export interface SiteSection {
  id: string;
  type: 'hero' | 'about' | 'services' | 'gallery' | 'testimonials' | 'faq' | 'contact' | 'cta' | 'footer';
  title: string;
  content: string;
  order: number;
  data: Record<string, unknown>;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  og_image?: string;
  canonical_url?: string;
}

export interface Metadata {
  language: string;
  viewport: string;
  theme_color: string;
}

export interface AuditResult {
  id: string;
  site_id: string;
  tenant_id: string;
  score: AuditScore;
  issues: AuditIssue[];
  created_at: string;
}

export interface AuditScore {
  seo: number;
  performance: number;
  mobile: number;
  accessibility: number;
  ux: number;
  conversion: number;
  content: number;
  overall: number;
}

export interface AuditIssue {
  id: string;
  category: keyof AuditScore;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  suggestion: string;
  auto_fixable: boolean;
}

export interface Proposal {
  id: string;
  client_id: string;
  tenant_id: string;
  title: string;
  description: string;
  items: ProposalItem[];
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  created_at: string;
}

export interface ProposalItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  max_sites: number;
  max_clients: number;
  custom_domain: boolean;
  ai_generations: number;
}

export interface DashboardStats {
  total_clients: number;
  total_sites: number;
  published_sites: number;
  in_production: number;
  mrr: number;
  active_plans: number;
  custom_domains: number;
  recent_activity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'site_created' | 'site_published' | 'client_added' | 'audit_completed' | 'domain_connected';
  title: string;
  description: string;
  timestamp: string;
}
