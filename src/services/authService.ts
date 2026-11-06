import axios from 'axios';
import { loginSchema } from '@src/schemas/authSchema';
import type { LoginDTO } from '@src/schemas/authSchema';
import z from 'zod';

// 1. Perbarui Interface agar mendukung struktur objek tree
export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string; // Ubah ke string murni untuk pesan global/umum
  errors?: {        // Properti khusus untuk menampung struktur tree dari Zod
    errors: string[];
    properties?: Record<string, any>;
  };
}

export async function loginUser(payload: LoginDTO): Promise<LoginResponse> {
  const result = loginSchema.safeParse(payload);

  if (!result.success) {
    const tree = z.treeifyError(result.error);
    return {
      success: false,
      message: 'Validasi form gagal.',
      errors: tree                    
    };
  }

  // Penanganan Request ke Server
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_API}/login`, result.data);
    return {
      success: true,
      token: response.data.token
    };
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Login gagal.',
        errors: error.response.data.errors 
      };
    }
    return {
      success: false,
      message: 'Tidak dapat terhubung ke server.'
    };
  }
}
