export type Role = 'student' | 'lecturer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: Role;
}
