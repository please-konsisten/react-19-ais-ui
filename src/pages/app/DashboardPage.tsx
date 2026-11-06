import AppLayout from '@src/components/layouts/AppLayout';
import { useAuth } from '@src/contexts/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
      <main>
        <h1>Dashboard</h1>
        <p>Email: {user.email}</p>
        <p>Role: {JSON.stringify(user)}</p>

        <button type="button" onClick={() => logout()}>
          Logout
        </button>
      </main>
  );
}
