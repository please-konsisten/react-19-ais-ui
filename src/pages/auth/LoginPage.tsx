"use client"
import React, { useState } from 'react';

import LoginForm from '@src/components/features/LoginForm';
import {  LoginFormInputUserAccount, 
          LoginFormInputPassword } from '@src/components/features/LoginFormInput';
import LoginLayout from '@src/components/layouts/LoginLayout';
import { loginSchema } from '@src/schemas/authSchema';
import type { LoginDTO } from '@src/schemas/authSchema';
import z from 'zod';
import axios from 'axios';


export default function LoginPage() {
  const [userAccount, setUserAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State untuk error API (Backend / Global)
  const [serverError, setServerError] = useState("");

  const loginAPIHandler = async (req: LoginDTO) => {
    const result = loginSchema.safeParse(req);

    if (!result.success) {
      console.error("Gagal Validasi:", z.treeifyError(result.error));
      return; 
    }

    const { userAccount, password } = result.data;

    try {
      const response = await axios.post('http://localhost:3000/login', {
        userAccount,
        password
      });

      const responseData = response.data;
      
      localStorage.setItem('token', responseData.token);

    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setServerError(error.response.data.message || 'Login gagal');
      } else {
        setServerError('Tidak dapat terhubung ke server mock.');
      }
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginLayout> 
      <LoginPageHeader /> 
      {/* ======================== */}
      <LoginForm requestHandler={loginAPIHandler}>
        <LoginFormInputUserAccount
          value={userAccount} 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAccount(e.target.value)}
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