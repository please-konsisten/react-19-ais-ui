import { AppWindow, Calendar, FileText, LayoutDashboard, UserCheck, type LucideIcon } from 'lucide-react';
import type { Role } from '@src/types/auth';

export interface NavItem {
  title: string;
  icon: LucideIcon;
  to: string;
}

export const navByRole: Record<Role, NavItem[]> = {
  student: [
    { title: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { title: 'Nilai', icon: FileText, to: '/score' },
    { title: 'Presensi', icon: UserCheck, to: '/absence' },
    { title: 'Jadwal Mahasiswa', icon: Calendar, to: '/schedule' },
    { title: 'Registrasi', icon: AppWindow, to: '/registration' },
  ],
  lecturer: [],
  admin: [],
};
