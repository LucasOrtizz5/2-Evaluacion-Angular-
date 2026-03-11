export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
  role?: 'user' | 'admin';
}
