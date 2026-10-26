"use client"
import React, { useState } from 'react';

import LoginForm from '@src/components/feature/LoginForm';
import {  LoginFormInputNIM, 
          LoginFormInputPassword } from '@src/components/feature/LoginFormInput';
import LoginLayout from '@src/components/layouts/LoginLayout';

export default function LoginPage() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Logging in with:', { nim, password });
  };

  return (
    <LoginLayout>
      {/* LoginPageHeader */}
      <LoginPageHeader />


      <LoginForm>
        {/* Input NIM */}
        <LoginFormInputNIM />

        {/* Input Kata Sandi */}
        <LoginFormInputPassword />
      </LoginForm>

      {/* Footer */}
      <LoginPageFooter />

    </LoginLayout>
  );
}

function LoginPageHeader() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-[#1a202c] mb-2">
        Selamat Datang Kembali!
      </h1>
      <p className="text-sm text-[#718096]">
        Silakan masuk ke akun Anda.
      </p>
    </div>
  )
}

function LoginPageFooter() {
  return (
    <div className="text-center text-xs text-[#718096] mt-6">
      Belum punya akun? <a href="#admin" className="text-[#b81d43] font-semibold hover:underline">Hubungi Administrasi</a>
    </div>
  )
}