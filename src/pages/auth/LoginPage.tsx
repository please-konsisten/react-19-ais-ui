import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginUser } from '@src/services/authService';

import AuthLayout from '@src/components/layouts/AuthLayout';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@src/components/ui/card';
import { cn } from 'cn';
import LoginForm from '@src/components/features/LoginForm';

export default function LoginPage() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data:any) => {
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
      setServerError(result.message || 'Terjadi kesalahan.');
    }
  };

  return (
    <AuthLayout>
      <CardHeader className={cn('text-center')}>
        <CardTitle className={cn('text-2xl font-bold text-[#1a202c] mb-2')}>Selamat Datang Kembali!</CardTitle>
        <CardDescription className={cn('text-sm text-[#718096]')}>Silakan masuk ke akun Anda.</CardDescription>
      </CardHeader>
      
      <CardContent>
        {/* {serverError && (
          // <div className="mb-4 p-2 text-xs text-red-600 bg-red-50 rounded border border-red-200 text-center">
          //   {serverError}
          // </div>
        )} */}

        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <LoginFormInputUserAccount
            value={userAccount} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAccount(e.target.value)}
          />
          
          <LoginFormInputPassword 
            value={password} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
          />

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 bg-[#b81d43] hover:bg-[#961635] text-white text-sm font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Memuat...' : 'Masuk'}
          </button>
        </form> */}
        <LoginForm
          submitHandler={submitHandler}
        />
      </CardContent>

      <CardFooter>
        <p className="text-center text-xs text-[#718096] w-full">
          Belum punya akun? <a href="#admin" className="text-[#b81d43] font-semibold hover:underline">Hubungi Administrasi</a>
        </p>
      </CardFooter>
    </AuthLayout>
  );
}
