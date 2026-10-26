"use client"
import React, { useState } from 'react';

import LoginForm from '@src/components/feature/LoginForm';
import {  LoginFormInputNIM, 
          LoginFormInputPassword } from '@src/components/feature/LoginFormInput';
import LoginLayout from '@src/components/layouts/LoginLayout';

interface RequestLoginAPI{
  username?: string
  email?: string
  password: string
}

export default function LoginPage() {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const loginAPIHandler = (req: RequestLoginAPI) => {
    console.log(req)
  };

  return (
    <LoginLayout> 
      <LoginPageHeader /> 
      {/* ======================== */}
      <LoginForm requestHandler={loginAPIHandler}>
        <LoginFormInputNIM 
          value={nim} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNim(e.target.value)}
          />
        <LoginFormInputPassword 
          value={password} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
          />
      </LoginForm>
      {/* ======================== */}
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