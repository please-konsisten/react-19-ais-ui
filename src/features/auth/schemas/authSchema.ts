import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;

export const loginSchema = z.object({
  userAccount: z
    .email("Format email tidak valid")
    .or(z.string().min(3, "Username minimal 3 karakter")),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(
      passwordRegex,
      "Password harus mengandung minimal 1 huruf besar, 1 angka, dan 1 karakter unik (simbol)"
    ),
});


export type LoginDTO = z.infer<typeof loginSchema>;
