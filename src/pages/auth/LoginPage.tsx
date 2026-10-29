import { useState } from 'react';
import { useNavigate } from 'react-router';
import { cn } from 'cn';

import AuthLayout from '@src/components/layouts/AuthLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@src/components/ui/card';
import LoginForm from '@src/components/features/LoginForm';

import { loginUser } from '@src/services/authService';

export default function LoginPage() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<any>(null);
  const [_isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data: any) => {
    const { userAccount, password } = data

    setIsLoading(true);
    setServerError(null);

    const result = await loginUser({ userAccount, password });

    setIsLoading(false);

    if (result.success && result.token) {
      alert('Login Berhasil!');
      localStorage.setItem('token', result.token);
      navigate("/");
    } else {
      setServerError(result);
    }
  };

  return (
    <AuthLayout>
      <Card className={cn("w-full max-w-80 h-auto flex flex-col bg-white dark:bg-[#1e293b] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 transition-all")} >
        <CardHeader className={cn('text-center')}>
          <CardTitle className={cn('text-2xl font-bold text-[#1a202c] dark:text-slate-100 tracking-tight')}>
            Selamat Datang Kembali!
          </CardTitle>
          <CardDescription className={cn('text-sm text-[#718096] dark:text-slate-400')}>
            Silakan masuk ke akun Anda.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm
            submitHandler={submitHandler}
            errorMessage={serverError}
          />
        </CardContent>

        <CardFooter className="border-t border-slate-50 dark:border-slate-800/50">
          <p className="text-center text-xs text-zinc-600 dark:text-zinc-400 w-full">
            Punya masalah dengan akun?{' '}
            <a href="#" className="text-[#b81d43] dark:text-[#f43f5e] font-semibold hover:underline transition-colors">
              Hubungi Administrasi
            </a>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
