// API client for backend integration
// Replace localStorage calls in storage.ts with these API calls

// Support both local and remote backend URLs
// In production, default to remote. In development, default to local.
const isProduction = import.meta.env.PROD;
const USE_REMOTE = import.meta.env.VITE_USE_REMOTE_BACKEND === 'true' || 
                   (import.meta.env.VITE_USE_REMOTE_BACKEND === undefined && isProduction);
const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL || 'http://localhost:3001/api';
const API_URL_REMOTE = import.meta.env.VITE_API_URL_REMOTE || 'https://api.cannoncapitalpartners.org/api';
const API_BASE = import.meta.env.VITE_API_URL || (USE_REMOTE ? API_URL_REMOTE : API_URL_LOCAL);

// API URL configuration (logging removed for production)

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any;
}

class ApiClient {
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Suppress all console output during API requests
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    // Temporarily disable console methods
    const noop = () => {};
    console.log = noop;
    console.error = noop;
    console.warn = noop;
    console.info = noop;

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Don't expose API structure in errors
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error: any) {
      // Silently handle errors - don't expose API endpoints or structure
      // Re-throw with generic error message
      const genericError = new Error(error.message || 'An error occurred');
      genericError.name = 'ApiError';
      throw genericError;
    } finally {
      // Restore console methods
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;
    }
  }

  // Auth
  async requestOTP(email: string) {
    return this.request<{ message?: string }>('/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTP(email: string, otp: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
    
    if (response.success && response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response;
  }

  // Legacy login (deprecated)
  async login(username: string, password: string) {
    const response = await this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.success && response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response;
  }

  async verifyToken() {
    try {
      return await this.request('/auth/verify');
    } catch (error) {
      // Silently handle token verification errors - don't expose API structure
      return { success: false, error: 'Authentication required' };
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  // Contact
  async submitContact(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    inquiryType: string;
    message?: string;
  }) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContactSubmissions() {
    return this.request<any[]>('/contact');
  }

  // Testimonials
  async getTestimonials(approvedOnly: boolean = true) {
    const query = approvedOnly ? '' : '?approved=false';
    return this.request<any[]>('/testimonials' + query);
  }

  async getApprovedTestimonials() {
    return this.request<any[]>('/testimonials/approved');
  }

  async createTestimonial(data: {
    name: string;
    role: string;
    company?: string;
    content: string;
    rating: number;
    image?: string;
  }) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: Partial<any>) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Reviews
  async getReviews(articleSlug?: string, approvedOnly: boolean = true) {
    const params = new URLSearchParams();
    if (articleSlug) params.append('articleSlug', articleSlug);
    if (!approvedOnly) params.append('approved', 'false');
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>('/reviews' + query);
  }

  async getArticleReviews(slug: string) {
    return this.request<any[]>(`/reviews/article/${slug}`);
  }

  async createReview(data: {
    articleSlug: string;
    authorName: string;
    authorEmail: string;
    rating: number;
    content: string;
  }) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async likeReview(reviewId: string, userIdentifier?: string) {
    const headers: Record<string, string> = {};
    if (userIdentifier) {
      headers['x-user-id'] = userIdentifier;
    }
    return this.request<any>(`/reviews/${reviewId}/like`, {
      method: 'POST',
      headers,
    });
  }

  async updateReview(id: string, data: Partial<any>) {
    return this.request(`/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteReview(id: string) {
    return this.request(`/reviews/${id}`, {
      method: 'DELETE',
    });
  }

  // Newsletter
  async subscribeNewsletter(email: string) {
    return this.request('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async getNewsletterSubscribers() {
    return this.request<any[]>('/newsletter/subscribers');
  }

  async sendNewsletter(subject: string, content: string) {
    return this.request<{
      total: number;
      success: number;
      failed: number;
      errors: string[];
    }>('/newsletter/send', {
      method: 'POST',
      body: JSON.stringify({ subject, content }),
    });
  }

  // Articles/Insights
  async getArticles(publishedOnly: boolean = true) {
    const query = publishedOnly ? '' : '?published=false';
    return this.request<any[]>('/articles' + query);
  }

  async getPublishedArticles() {
    return this.request<any[]>('/articles/published');
  }

  async getArticle(slug: string) {
    return this.request<any>(`/articles/${slug}`);
  }

  async likeArticle(slug: string, userIdentifier?: string) {
    const headers: HeadersInit = {};
    if (userIdentifier) {
      headers['x-user-id'] = userIdentifier;
    }
    return this.request<{ likes: number; liked: boolean }>(`/articles/${slug}/like`, {
      method: 'POST',
      headers,
    });
  }

  async createArticle(data: {
    slug: string;
    title: string;
    category: string;
    date: string;
    author: string;
    authorRole: string;
    readTime: string;
    heroImage: string;
    excerpt: string;
    content: string[];
    relatedTopics: string[];
    published?: boolean;
  }) {
    return this.request('/articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateArticle(id: string, data: Partial<any>) {
    return this.request(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteArticle(id: string) {
    return this.request(`/articles/${id}`, {
      method: 'DELETE',
    });
  }

  // Services
  async getServices(publishedOnly: boolean = true) {
    const query = publishedOnly ? '' : '?published=false';
    return this.request<any[]>('/services' + query);
  }

  async getPublishedServices() {
    return this.request<any[]>('/services/published');
  }

  async getService(slug: string) {
    return this.request<any>(`/services/${slug}`);
  }

  async createService(data: {
    slug: string;
    title: string;
    subtitle?: string;
    description: string;
    heroImage: string;
    overview: string;
    capabilities: string[];
    approach: Array<{ title: string; description: string }>;
    stats: Array<{ value: string; label: string }>;
    icon?: string;
    orderIndex?: number;
    published?: boolean;
  }) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: Partial<any>) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects
  async getProjects(publishedOnly: boolean = true, isActive?: boolean) {
    const params = new URLSearchParams();
    if (!publishedOnly) params.append('published', 'false');
    if (isActive !== undefined) params.append('isActive', isActive.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>('/projects' + query);
  }

  async getActiveProjects() {
    return this.request<any[]>('/projects/active');
  }

  async getCompletedProjects() {
    return this.request<any[]>('/projects/completed');
  }

  async getProject(id: string) {
    return this.request<any>(`/projects/${id}`);
  }

  async createProject(data: {
    title: string;
    category: string;
    value?: string;
    status: string;
    duration?: string;
    location?: string;
    description: string;
    heroImage: string;
    challenge?: string;
    strategy?: string;
    outcomes: string[];
    tools: string[];
    isActive?: boolean;
    published?: boolean;
  }) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: Partial<any>) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Staff
  async getStaff(publishedOnly: boolean = true) {
    const query = publishedOnly ? '' : '?published=false';
    return this.request<any[]>('/staff' + query);
  }

  async getPublishedStaff() {
    return this.request<any[]>('/staff/published');
  }

  async getStaffMember(id: string) {
    return this.request<any>(`/staff/${id}`);
  }

  async createStaff(data: {
    name: string;
    role: string;
    bio: string;
    image?: string;
    orderIndex?: number;
    published?: boolean;
  }) {
    return this.request('/staff', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStaff(id: string, data: Partial<any>) {
    return this.request(`/staff/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStaff(id: string) {
    return this.request(`/staff/${id}`, {
      method: 'DELETE',
    });
  }

  // Comments
  async getArticleComments(slug: string, approvedOnly: boolean = true) {
    const query = approvedOnly ? '' : '?approved=false';
    return this.request<any[]>(`/comments/article/${slug}${query}`);
  }

  async getApprovedComments(slug: string) {
    return this.request<any[]>(`/comments/article/${slug}/approved`);
  }

  async getAllComments() {
    return this.request<any[]>('/comments');
  }

  async createComment(data: {
    articleSlug: string;
    authorName: string;
    authorEmail: string;
    content: string;
  }) {
    return this.request('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateComment(id: string, data: Partial<any>) {
    return this.request(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteComment(id: string) {
    return this.request(`/comments/${id}`, {
      method: 'DELETE',
    });
  }

  // Careers
  async getCareers(publishedOnly: boolean = true) {
    const query = publishedOnly ? '' : '?published=false';
    return this.request<any[]>('/careers' + query);
  }

  async getPublishedCareers() {
    return this.request<any[]>('/careers/published');
  }

  async getCareer(id: string) {
    return this.request<any>(`/careers/${id}`);
  }

  async createCareer(data: {
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements?: string;
    responsibilities?: string;
    orderIndex?: number;
    published?: boolean;
  }) {
    return this.request('/careers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCareer(id: string, data: Partial<any>) {
    return this.request(`/careers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCareer(id: string) {
    return this.request(`/careers/${id}`, {
      method: 'DELETE',
    });
  }

  // Impact Stories
  async getImpactStories(publishedOnly: boolean = true) {
    const query = publishedOnly ? '' : '?published=false';
    return this.request<any[]>('/impact' + query);
  }

  async getPublishedImpactStories() {
    return this.request<any[]>('/impact/published');
  }

  async getImpactStory(id: string) {
    return this.request<any>(`/impact/${id}`);
  }

  async createImpactStory(data: {
    title: string;
    category: string;
    location: string;
    impact: string;
    description: string;
    image: string;
    metrics: Array<{ label: string; value: string }>;
    orderIndex?: number;
    published?: boolean;
  }) {
    return this.request('/impact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateImpactStory(id: string, data: {
    title?: string;
    category?: string;
    location?: string;
    impact?: string;
    description?: string;
    image?: string;
    metrics?: Array<{ label: string; value: string }>;
    orderIndex?: number;
    published?: boolean;
  }) {
    return this.request(`/impact/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteImpactStory(id: string) {
    return this.request(`/impact/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();

