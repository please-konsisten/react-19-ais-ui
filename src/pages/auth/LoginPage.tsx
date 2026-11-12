// import { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { cn } from 'cn';

// import AuthLayout from '@src/components/layouts/AuthLayout';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@src/components/ui/card';
// import LoginForm from '@src/components/features/LoginForm';

// import { loginUser } from '@src/services/authService';

// export default function LoginPage() {
//   const navigate = useNavigate();

//   const [serverError, setServerError] = useState<any>(null);
//   const [_isLoading, setIsLoading] = useState(false);

//   const submitHandler = async (data: any) => {
//     const { userAccount, password } = data

//     setIsLoading(true);
//     setServerError(null);

//     const result = await loginUser({ userAccount, password });

//     setIsLoading(false);

//     if (result.success && result.token) {
//       alert('Login Berhasil!');
//       localStorage.setItem('token', result.token);
//       navigate("/");
//     } else {
//       setServerError(result);
//     }
//   };

//   return (
//     <AuthLayout>
//       <Card className={cn("w-full max-w-80 h-auto flex flex-col bg-white dark:bg-[#1e293b] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 transition-all")} >
//         <CardHeader className={cn('text-center')}>
//           <CardTitle className={cn('text-2xl font-bold text-[#1a202c] dark:text-slate-100 tracking-tight')}>
//             Selamat Datang Kembali!
//           </CardTitle>
//           <CardDescription className={cn('text-sm text-[#718096] dark:text-slate-400')}>
//             Silakan masuk ke akun Anda.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <LoginForm
//             submitHandler={submitHandler}
//             errorMessage={serverError}
//           />
//         </CardContent>

//         <CardFooter className="border-t border-slate-50 dark:border-slate-800/50">
//           <p className="text-center text-xs text-zinc-600 dark:text-zinc-400 w-full">
//             Punya masalah dengan akun?{' '}
//             <a href="#" className="text-[#b81d43] dark:text-[#f43f5e] font-semibold hover:underline transition-colors">
//               Hubungi Administrasi
//             </a>
//           </p>
//         </CardFooter>
//       </Card>
//     </AuthLayout>
//   );
// }

import { useActionState } from 'react';
import { Link, useLocation } from 'react-router';

import { useAuth } from '@src/contexts/AuthContext';
import { getErrorMessage } from '@src/api';

interface LoginActionState {
  error: string | null;
  identifier: string;
}



export default function LoginPage() {
  const { login } = useAuth();
  const location = useLocation();

  // React 19: useActionState mengelola hasil, error, dan status pending form.
  // Setelah action selesai, React mereset field form, jadi identifier
  // dikembalikan lewat state agar tidak hilang saat login gagal.
const [state, formAction, isPending] = useActionState<LoginActionState, FormData>(
  async (_prevState, formData) => {
    const identifier = String(formData.get('identifier') ?? '');
    const password = String(formData.get('password') ?? '');

    try {
      await login({ identifier, password });
      // Sukses: GuestRoute melihat user sudah ada dan mengarahkan ke /dashboard
      return { error: null, identifier: '' };
    } catch (error) {
      return { error: getErrorMessage(error), identifier };
    }
  },
  { error: null, identifier: '' }
);

  return (
    <main>
      <h1>Login</h1>

      {location.state?.registered && <p>Registrasi berhasil, silakan login.</p>}

      <form action={formAction}>
        <div>
          <label htmlFor="identifier">Email atau username</label>
          <br />
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            defaultValue={state.identifier}
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
            autoComplete="current-password"
            required
          />
        </div>

        {state.error && <p role="alert">{state.error}</p>}

        <button type="submit" disabled={isPending}>
          {isPending ? 'Memproses...' : 'Login'}
        </button>
      </form>

      <p>
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </main>
  );
}
