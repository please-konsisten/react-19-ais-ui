import { Link, useSearchParams } from 'react-router';

import ContactAdminButtons from '@src/shared/components/ContactAdminButtons';
import { Card, CardContent, CardFooter, CardHeader } from '@src/components/ui/card';

type HelpType = 'forgot-password' | 'forgot-email' | 'locked' | 'other';

interface HelpConfig {
  label: string;
  title: string;
  description: string;
  checklist: string[];
  subject: string;
  message: string;
}

const HELP: Record<HelpType, HelpConfig> = {
  'forgot-password': {
    label: 'Lupa password',
    title: 'Lupa password?',
    description:
      'Reset password dilakukan oleh admin. Kirim permintaan beserta data berikut agar identitasmu bisa diverifikasi.',
    checklist: ['Nama lengkap', 'NIM / username', 'Email yang terdaftar'],
    subject: 'Permintaan Reset Password iGRACIAS',
    message:
      'Halo Admin,\n\nSaya lupa password akun iGRACIAS dan ingin meminta reset.\n\nNama lengkap:\nNIM / username:\nEmail terdaftar:\n\nTerima kasih.',
  },
  'forgot-email': {
    label: 'Lupa email / username',
    title: 'Lupa email atau username?',
    description:
      'Admin dapat membantu menemukan akunmu. Sertakan data yang kamu ingat untuk proses verifikasi.',
    checklist: ['Nama lengkap', 'NIM', 'Program studi dan angkatan'],
    subject: 'Bantuan Email / Username iGRACIAS',
    message:
      'Halo Admin,\n\nSaya lupa email/username akun iGRACIAS saya.\n\nNama lengkap:\nNIM:\nProgram studi:\nAngkatan:\n\nTerima kasih.',
  },
  locked: {
    label: 'Akun terkunci',
    title: 'Akun terkunci atau tidak bisa masuk?',
    description:
      'Jika akunmu terkunci, dinonaktifkan, atau selalu gagal login, admin akan memeriksa statusnya.',
    checklist: ['Nama lengkap', 'NIM / username', 'Pesan error yang muncul'],
    subject: 'Bantuan Akun Terkunci iGRACIAS',
    message:
      'Halo Admin,\n\nAkun iGRACIAS saya tidak bisa digunakan.\n\nNama lengkap:\nNIM / username:\nPesan error yang muncul:\n\nTerima kasih.',
  },
  other: {
    label: 'Masalah lain',
    title: 'Butuh bantuan akun?',
    description:
      'Pilih jenis masalah di atas, atau hubungi admin langsung dan jelaskan kendalamu.',
    checklist: ['Nama lengkap', 'NIM / username', 'Penjelasan singkat masalahnya'],
    subject: 'Bantuan Akun iGRACIAS',
    message:
      'Halo Admin,\n\nSaya butuh bantuan terkait akun iGRACIAS.\n\nNama lengkap:\nNIM / username:\nMasalah:\n\nTerima kasih.',
  },
};

const TYPES = Object.keys(HELP) as HelpType[];

function isHelpType(value: string | null): value is HelpType {
  return value !== null && value in HELP;
}

export default function AccountHelpPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawType = searchParams.get('type');
  const type: HelpType = isHelpType(rawType) ? rawType : 'other';
  const help = HELP[type];

  return (
    <Card className="w-full max-w-md gap-0 rounded-2xl border border-slate-200 bg-white py-0 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="px-8 pt-8 pb-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {help.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{help.description}</p>
      </CardHeader>

      <CardContent className="space-y-5 px-8 py-6">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Jenis masalah akun">
          {TYPES.map((key) => {
            const active = key === type;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSearchParams({ type: key }, { replace: true })}
                className={
                  'rounded-full px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/20 ' +
                  (active
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700')
                }
              >
                {HELP[key].label}
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-slate-600 dark:bg-slate-800/50 dark:text-slate-300">
          <p className="mb-1 font-medium text-slate-900 dark:text-white">Siapkan data berikut:</p>
          <ul className="list-inside list-disc space-y-0.5">
            {help.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          Jangan pernah mengirim password kamu lewat email atau WhatsApp. Admin tidak akan memintanya.
        </p>

        {/* key supaya tombol ikut berganti pesan saat jenis masalah berubah */}
        <ContactAdminButtons key={type} subject={help.subject} message={help.message} />
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 px-8 py-5 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sudah ingat?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">
            Kembali ke login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}