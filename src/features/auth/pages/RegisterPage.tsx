import { Link } from 'react-router';
import { Mail, MessageCircle } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader } from '@src/components/ui/card';
import { ADMIN_EMAIL, ADMIN_WHATSAPP } from '@src/config/env';

const emailHref =
  `mailto:${ADMIN_EMAIL}` +
  `?subject=${encodeURIComponent('Permintaan Akun iGRACIAS')}` +
  `&body=${encodeURIComponent(
    'Halo Admin,\n\nSaya ingin meminta akun iGRACIAS.\n\nNama lengkap:\nNIM / No. pendaftaran:\nProgram studi:\nAngkatan:\n\nTerima kasih.'
  )}`;

const whatsappHref =
  `https://wa.me/${ADMIN_WHATSAPP}` +
  `?text=${encodeURIComponent(
    'Halo Admin, saya ingin meminta akun iGRACIAS.\n\nNama lengkap:\nNIM / No. pendaftaran:\nProgram studi:\nAngkatan:'
  )}`;

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md gap-0 rounded-2xl border border-slate-200 bg-white py-0 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="px-8 pt-8 pb-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Belum punya akun?
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Akun iGRACIAS dibuat oleh admin. Hubungi admin lewat email atau WhatsApp
          untuk meminta akun.
        </p>
      </CardHeader>

      <CardContent className="space-y-4 px-8 py-6">
        <div className="rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
          <p className="mb-1 font-medium text-slate-900 dark:text-white">
            Siapkan data berikut:
          </p>
          <ul className="list-inside list-disc space-y-0.5">
            <li>Nama lengkap</li>
            <li>NIM / nomor pendaftaran</li>
            <li>Program studi dan angkatan</li>
          </ul>
        </div>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30"
        >
          <MessageCircle className="size-4" />
          Hubungi via WhatsApp
        </a>

        <a
          href={emailHref}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Mail className="size-4" />
          Kirim email ke admin
        </a>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 px-8 py-5 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}