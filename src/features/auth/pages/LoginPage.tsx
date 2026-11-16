import { useActionState } from 'react';
import { Link, useLocation } from 'react-router';

import { useAuth } from '@src/app/providers/AuthProvider';
import { getErrorMessage } from '@src/shared/lib/api';
import { Card, CardContent, CardFooter, CardHeader } from '@src/components/ui/card';

interface LoginActionState {
  error: string | null;
  identifier: string;
}

const inputClass =
  'h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 ' +
  'placeholder:text-slate-400 outline-none transition ' +
  'focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 ' +
  'disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white';

export default function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();

  const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(
    async (_prevState, formData) => {
      const identifier = String(formData.get('identifier') ?? '');
      const password = String(formData.get('password') ?? '');

      try {
        await login({ identifier, password });
        return { error: null, identifier: '' };
      } catch (error) {
        return { error: getErrorMessage(error), identifier };
      }
    },
    { error: null, identifier: '' }
  );

  return (
    <Card className="w-full max-w-md gap-0 rounded-2xl border border-slate-200 bg-white py-0 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="px-8 pt-8 pb-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Selamat datang
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Masuk untuk melanjutkan ke dashboard.
        </p>
      </CardHeader>

      <CardContent className="px-8 py-6">
        {location.state?.registered && (
          <p className="mb-4 rounded-xl bg-blue-50 px-3.5 py-2.5 text-sm text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            Registrasi berhasil, silakan login.
          </p>
        )}

        <form action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="identifier"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Email atau username
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              placeholder="nama@email.com"
              defaultValue={state.identifier}
              disabled={isPending}
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isPending}
              required
              className={inputClass}
            />
          </div>

          {state.error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-3.5 py-2.5 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
            >
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 px-8 py-5 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Belum punya akun?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:underline">
            Daftar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}