import { RouterProvider } from 'react-router/dom';

import { AuthProvider } from '@src/app/providers/AuthProvider';
import { ThemeProvider } from '@src/app/providers/ThemeProvider';
import { router } from '@src/app/routes';
import '@src/index.css';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light">
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

