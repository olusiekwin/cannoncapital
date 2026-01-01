export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  inquiryType: string;
  message?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  approved: boolean;
  createdAt: string;
}

export interface ArticleReview {
  id: string;
  articleSlug: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  content: string;
  approved: boolean;
  createdAt: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
}

