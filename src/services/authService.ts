import axios from 'axios';
import { loginSchema } from '@src/schemas/authSchema';
import type { LoginDTO } from '@src/schemas/authSchema';

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export async function loginUser(payload: LoginDTO): Promise<LoginResponse> {
  const result = loginSchema.safeParse(payload);
  if (!result.success) {
    return {
      success: false,
      message: "Format akun atau password salah."
    };
  }

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
        message: error.response.data.message || 'Login gagal.'
      };
    }
    return {
      success: false,
      message: 'Tidak dapat terhubung ke server.'
    };
  }
}
