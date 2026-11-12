import { RouterProvider } from 'react-router/dom';

import { AuthProvider } from '@src/contexts/AuthContext';
import { ThemeProvider } from '@src/components/theme-provider';
import { router } from '@src/routes';
import './index.css';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

