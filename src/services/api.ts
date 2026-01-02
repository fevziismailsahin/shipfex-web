/**
 * API Service Layer with Auth (access + refresh token flow)
 */

export interface AdminWarehouse {
  id: string;
  tenant_id: string;
  name: string;
  code?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  postal_code?: string | null;
  lat?: number | null;
  lng?: number | null;
  area_m2?: number | null;
  workers_count?: number | null;
  cold_chain_supported: boolean;
  metadata?: unknown;
  created_at: string;
  updated_at: string;
}

export interface AdminCreateWarehouseInput {
  name: string;
  code?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  region?: string;
  country?: string;
  postal_code?: string;
  lat?: number;
  lng?: number;
  area_m2?: number;
  workers_count?: number;
  cold_chain_supported?: boolean;
  metadata?: unknown;
}

export interface AdminWarehouseStaff {
  user_id: string;
  email: string;
  role: string;
  warehouse_id: string;
  job_title?: string | null;
  active: boolean;
  created_at: string;
}

export interface AdminCreateWarehouseStaffInput {
  email: string;
  password: string;
  role: 'WM' | 'WO';
  job_title?: string;
}

export interface AdminUpdateWarehouseStaffInput {
  active: boolean;
  job_title?: string;
}

export interface AdminResetWarehouseStaffPasswordInput {
  password: string;
}
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const TOKEN_KEY = 'shipfex_tokens_v1';
const USER_KEY = 'shipfex_user_v1';

export interface ApiError {
  message: string;
  status?: number;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  stock: number;
}

export interface Order {
  id: number;
  customer: string;
  product_id: number;
  quantity: number;
  status: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  stock: number;
}

export interface CreateOrderInput {
  customer: string;
  product_id: number;
  quantity: number;
}

// --- Scoped API types (v1) ---
export interface MerchantProduct {
  id: number;
  merchant_id?: string | null;
  name: string;
  sku: string;
  price_cents: number;
  currency: string;
  created_at: unknown;
}

export interface MerchantOrder {
  id: number;
  merchant_id?: string | null;
  customer: string;
  status: string;
  channel: string;
  external_order_ref?: string | null;
  ship_to?: unknown;
  created_at: unknown;
}

export interface MerchantInventoryWarehouseSummary {
  warehouse_id: string;
  sku_count: number;
  on_hand: number;
  reserved: number;
  available: number;
}

export interface MerchantInventorySummary {
  merchant_id: string;
  warehouses: MerchantInventoryWarehouseSummary[];
}

export interface WarehouseTask {
  id: string;
  warehouse_id: string;
  task_type: string;
  status: string;
  priority: number;
  assigned_to: string | null;
  related_order_id: number | null;
  payload: unknown;
  created_at: unknown;
  completed_at: unknown | null;
}

// --- Public marketing content ---
export interface PublicLocation {
  id: string;
  name: string;
  city: string;
  region?: string | null;
  country: string;
  lat: number;
  lng: number;
}

export interface AdminPublicLocation extends PublicLocation {
  tenant_id: string;
  is_active: boolean;
  sort_order: number;
  created_at: unknown;
  updated_at: unknown;
}

export interface AdminCreatePublicLocationInput {
  name: string;
  city: string;
  region?: string | null;
  country?: string;
  lat: number;
  lng: number;
  is_active?: boolean;
  sort_order?: number;
}

export interface AdminUpdatePublicLocationInput {
  name?: string;
  city?: string;
  region?: string | null;
  country?: string;
  lat?: number;
  lng?: number;
  is_active?: boolean;
  sort_order?: number;
}

export type HomeCta = {
  label: string;
  href: string;
};

export type HomeStat = {
  label: string;
  value: string;
};

export type HomeService = {
  title: string;
  desc: string;
  icon: string;
  link: string;
};

export type HomeBenefitIcon = 'trending_up' | 'users' | 'globe' | 'shield';

export type HomeBenefit = {
  icon: HomeBenefitIcon;
  title: string;
  desc: string;
};

export type PublicHomeContent = {
  hero?: {
    title?: string;
    subtitle?: string;
    primaryCta?: HomeCta;
    secondaryCta?: HomeCta;
  };
  stats?: HomeStat[];
  servicesSection?: { title?: string; subtitle?: string };
  services?: HomeService[];
  mapSection?: { title?: string; subtitle?: string };
  benefitsSection?: { title?: string; subtitle?: string };
  benefits?: HomeBenefit[];
  cta?: {
    title?: string;
    subtitle?: string;
    primaryCta?: HomeCta;
    secondaryCta?: HomeCta;
  };
};

export interface CreateMerchantProductInput {
  name: string;
  sku: string;
  price_cents?: number;
  currency?: string;
}

export interface CreateMerchantOrderInput {
  customer: string;
  items: Array<{ product_id: number; quantity: number }>;
  ship_to?: unknown;
  channel?: string;
  external_order_ref?: string;
}

export interface UpdateStockInput {
  amount: number;
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  tenant_id: string;
  email: string;
  role: string;
  warehouse_id?: string | null;
  merchant_id?: string | null;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

const loadTokens = (): Tokens | null => {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    return raw ? (JSON.parse(raw) as Tokens) : null;
  } catch {
    return null;
  }
};

const loadUser = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

const persistTokens = (tokens: Tokens | null) => {
  if (tokens) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

const persistUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

class ApiService {
  private tokens: Tokens | null = loadTokens();
  private user: User | null = loadUser();

  getTokens() {
    return this.tokens;
  }

  getUser() {
    return this.user;
  }

  clearTokens() {
    this.tokens = null;
    persistTokens(null);
    this.user = null;
    persistUser(null);
  }

  private setTokens(tokens: Tokens) {
    this.tokens = tokens;
    persistTokens(tokens);
  }

  private setUser(user: User) {
    this.user = user;
    persistUser(user);
  }

  // Try to resume session using stored tokens
  async resumeSession() {
    if (!this.tokens?.access_token) return null;
    try {
      const user = await this.me();
      this.setUser(user);
      return user;
    } catch (err) {
      this.clearTokens();
      throw err;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    auth = false,
    retry = true
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> | undefined),
    };

    if (auth && this.tokens?.access_token) {
      headers['Authorization'] = `Bearer ${this.tokens.access_token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401 && auth && retry && this.tokens?.refresh_token) {
      try {
        await this.refreshToken();
        return this.request<T>(endpoint, options, auth, false);
      } catch (err) {
        this.clearTokens();
        throw err;
      }
    }

    if (!response.ok) {
      let errorMsg = `HTTP ${response.status}`;
      try {
        const json = await response.json();
        errorMsg = json.message || errorMsg;
      } catch {
        const text = await response.text();
        errorMsg = text || errorMsg;
      }
      console.error('API Error:', { status: response.status, message: errorMsg });
      throw {
        message: errorMsg,
        status: response.status,
      } satisfies ApiError;
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }

  // --- Public marketing ---
  async publicListLocations(): Promise<PublicLocation[]> {
    return this.request<PublicLocation[]>('/public/locations', { method: 'GET' }, false);
  }

  async publicGetHomeContent(): Promise<PublicHomeContent> {
    return this.request<PublicHomeContent>('/public/home-content', { method: 'GET' }, false);
  }

  // --- Admin marketing content ---
  async adminListPublicLocations(): Promise<AdminPublicLocation[]> {
    return this.request<AdminPublicLocation[]>('/admin/public-locations', { method: 'GET' }, true);
  }

  async adminCreatePublicLocation(input: AdminCreatePublicLocationInput): Promise<AdminPublicLocation> {
    return this.request<AdminPublicLocation>(
      '/admin/public-locations',
      { method: 'POST', body: JSON.stringify(input) },
      true
    );
  }

  async adminUpdatePublicLocation(id: string, input: AdminUpdatePublicLocationInput): Promise<AdminPublicLocation> {
    return this.request<AdminPublicLocation>(
      `/admin/public-locations/${id}`,
      { method: 'PATCH', body: JSON.stringify(input) },
      true
    );
  }

  async adminDeletePublicLocation(id: string): Promise<{ ok: boolean }> {
    return this.request<{ ok: boolean }>(
      `/admin/public-locations/${id}`,
      { method: 'DELETE' },
      true
    );
  }

  async adminGetHomeContent(): Promise<PublicHomeContent> {
    return this.request<PublicHomeContent>('/admin/home-content', { method: 'GET' }, true);
  }

  async adminUpsertHomeContent(content: PublicHomeContent): Promise<PublicHomeContent> {
    return this.request<PublicHomeContent>(
      '/admin/home-content',
      { method: 'PATCH', body: JSON.stringify({ content }) },
      true
    );
  }

  // --- Auth ---
  async signup(email: string, password: string, role?: string, company_name?: string) {
    const res = await this.request<AuthResponse>(
      '/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify({ email, password, role, company_name }),
      },
      false
    );
    this.setTokens(res.tokens);
    this.setUser(res.user);
    return res;
  }

  async login(email: string, password: string) {
    const res = await this.request<AuthResponse>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
      false
    );
    this.setTokens(res.tokens);
    this.setUser(res.user);
    return res;
  }

  async me(): Promise<User> {
    const user = await this.request<User>('/auth/me', {}, true);
    this.setUser(user);
    return user;
  }

  async refreshToken() {
    if (!this.tokens?.refresh_token) {
      throw { message: 'Refresh token yok', status: 401 } satisfies ApiError;
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: this.tokens.refresh_token }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw {
        message: errorText || 'Refresh başarısız',
        status: response.status,
      } satisfies ApiError;
    }

    const res = (await response.json()) as AuthResponse;
    this.setTokens(res.tokens);
    this.setUser(res.user);
    return res.tokens.access_token;
  }

  async logout() {
    if (this.tokens?.refresh_token) {
      await this.request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: this.tokens.refresh_token }),
      });
    }
    this.clearTokens();
  }

  // --- Health ---
  async healthCheck(): Promise<string> {
    return this.request<string>('/');
  }

  // --- Products ---
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>('/products', {}, true);
  }

  async createProduct(data: CreateProductInput): Promise<Product> {
    return this.request<Product>(
      '/products',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      true
    );
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/products/${id}`, { method: 'DELETE' }, true);
  }

  async updateStock(id: number, amount: number): Promise<Product> {
    return this.request<Product>(
      `/products/${id}/stock`,
      {
        method: 'PATCH',
        body: JSON.stringify({ amount }),
      },
      true
    );
  }

  // --- Orders ---
  async getOrders(): Promise<Order[]> {
    return this.request<Order[]>('/orders', {}, true);
  }

  async createOrder(data: CreateOrderInput): Promise<Order> {
    return this.request<Order>(
      '/orders',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      true
    );
  }

  async deleteOrder(id: number): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/orders/${id}`, { method: 'DELETE' }, true);
  }

  // --- Tracking ---
  async getOrderTracking(orderId: number) {
    return this.request(`/orders/${orderId}/tracking`, {}, true) as Promise<{
      id: number;
      order_id: number;
      status: string;
      location: string;
      created_at: string;
    }[]>;
  }

  async addOrderTracking(orderId: number, data: { status: string; location: string }) {
    return this.request(`/orders/${orderId}/tracking`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, true);
  }

  // --- Merchant (scoped) ---
  async merchantListProducts(): Promise<MerchantProduct[]> {
    return this.request<MerchantProduct[]>('/merchant/products', {}, true);
  }

  async merchantCreateProduct(data: CreateMerchantProductInput): Promise<MerchantProduct> {
    return this.request<MerchantProduct>(
      '/merchant/products',
      { method: 'POST', body: JSON.stringify(data) },
      true
    );
  }

  async merchantDeleteProduct(id: number): Promise<{ ok: boolean } | { message: string }> {
    return this.request(`/merchant/products/${id}`, { method: 'DELETE' }, true) as Promise<
      { ok: boolean } | { message: string }
    >;
  }

  async merchantInventorySummary(): Promise<MerchantInventorySummary> {
    return this.request<MerchantInventorySummary>('/merchant/inventory', {}, true);
  }

  async merchantListOrders(): Promise<MerchantOrder[]> {
    return this.request<MerchantOrder[]>('/merchant/orders', {}, true);
  }

  async merchantCreateOrder(data: CreateMerchantOrderInput) {
    return this.request('/merchant/orders', { method: 'POST', body: JSON.stringify(data) }, true);
  }

  // --- Admin (platform owner) ---
  async adminListWarehouses(): Promise<AdminWarehouse[]> {
    return this.request<AdminWarehouse[]>('/admin/warehouses', {}, true);
  }

  async adminCreateWarehouse(data: AdminCreateWarehouseInput): Promise<AdminWarehouse> {
    return this.request<AdminWarehouse>('/admin/warehouses', { method: 'POST', body: JSON.stringify(data) }, true);
  }

  async adminDeleteWarehouse(warehouseId: string): Promise<{ ok: boolean }> {
    return this.request<{ ok: boolean }>(`/admin/warehouses/${warehouseId}`, { method: 'DELETE' }, true);
  }

  async adminListWarehouseStaff(warehouseId: string): Promise<AdminWarehouseStaff[]> {
    return this.request<AdminWarehouseStaff[]>(`/admin/warehouses/${warehouseId}/staff`, {}, true);
  }

  async adminCreateWarehouseStaff(
    warehouseId: string,
    data: AdminCreateWarehouseStaffInput
  ): Promise<User> {
    return this.request<User>(
      `/admin/warehouses/${warehouseId}/staff`,
      { method: 'POST', body: JSON.stringify(data) },
      true
    );
  }

  async adminUpdateWarehouseStaff(
    warehouseId: string,
    userId: string,
    data: AdminUpdateWarehouseStaffInput
  ): Promise<{ ok: boolean }> {
    return this.request<{ ok: boolean }>(
      `/admin/warehouses/${warehouseId}/staff/${userId}`,
      { method: 'PATCH', body: JSON.stringify(data) },
      true
    );
  }

  async adminResetWarehouseStaffPassword(
    warehouseId: string,
    userId: string,
    data: AdminResetWarehouseStaffPasswordInput
  ): Promise<{ ok: boolean }> {
    return this.request<{ ok: boolean }>(
      `/admin/warehouses/${warehouseId}/staff/${userId}/reset-password`,
      { method: 'POST', body: JSON.stringify(data) },
      true
    );
  }

  // --- Warehouse (scoped) ---
  async warehouseListTasks(warehouseId: string): Promise<WarehouseTask[]> {
    return this.request<WarehouseTask[]>(`/warehouse/${warehouseId}/tasks`, {}, true);
  }

  async warehouseAssignTask(warehouseId: string, taskId: string, userId: string) {
    return this.request(
      `/warehouse/${warehouseId}/tasks/${taskId}/assign/${userId}`,
      { method: 'PATCH' },
      true
    );
  }

  async warehouseCompleteTask(warehouseId: string, taskId: string) {
    return this.request(
      `/warehouse/${warehouseId}/tasks/${taskId}/complete`,
      { method: 'PATCH' },
      true
    );
  }
}

export const api = new ApiService();

export const authStore = {
  isAuthenticated: () => Boolean(api.getTokens()?.access_token),
  getUser: () => api.getUser(),
  hasRole: (roles: string[]) => {
    const user = api.getUser();
    if (!user) return false;
    return roles.includes(user.role);
  },
  logout: () => api.logout(),
};
