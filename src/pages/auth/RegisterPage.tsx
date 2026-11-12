import { useActionState } from 'react';
import { Link, useNavigate } from 'react-router';

import { useAuth } from '@src/contexts/AuthContext';
import { getErrorMessage } from '@src/api';

interface RegisterActionState {
  error: string | null;
  username?: string;
  email?: string;
  // Tambahkan field lain jika state awal Anda menyimpannya (misal: success?: boolean)
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

const [state, formAction, isPending] = useActionState<RegisterActionState, FormData>(
  async (_prevState, formData) => {
    const username = String(formData.get('username') ?? '');
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const confirmPassword = String(formData.get('confirmPassword') ?? '');

    // Field yang dipertahankan saat gagal (password sengaja tidak dikembalikan)
    const keep = { username, email };

    if (password !== confirmPassword) {
      return { error: 'Konfirmasi password tidak sama', ...keep };
    }

    try {
      await register({ username, email, password });
      navigate('/login', { replace: true, state: { registered: true } });
      return { error: null, username: '', email: '' };
    } catch (error) {
      return { error: getErrorMessage(error), ...keep };
    }
  },
  { error: null, username: '', email: '' }
);

  return (
    <main>
      <h1>Register</h1>

      {/* Atribut validasi (minLength, pattern, dll.) sesuaikan dengan aturan validasi backend */}
      <form action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            defaultValue={state.username}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.email}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword">Konfirmasi password</label>
          <br />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>

        {state.error && <p role="alert">{state.error}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? 'Memproses...' : 'Daftar'}
        </button>
      </form>

      <p>
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
