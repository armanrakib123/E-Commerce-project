export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  products_count?: number;
  created_at?: string;
  updated_at?: string;
}
