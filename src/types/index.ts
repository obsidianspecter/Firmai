export interface User {
  id: string;
  email: string;
  role: 'student' | 'professional' | 'admin';
  name: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  progress?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}