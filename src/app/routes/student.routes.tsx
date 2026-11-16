import type { RouteObject } from 'react-router';

export const studentRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    lazy: async () => {
      const page = await import('@src/features/student/pages/DashboardPage');
      return { Component: page.default };
    },
  },
  // TODO: daftarkan SchedulePage, AbsencePage, ScorePage, RegistrationPage saat siap dipakai
];
