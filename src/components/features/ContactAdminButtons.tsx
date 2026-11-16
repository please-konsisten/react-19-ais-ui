import { Mail, MessageCircle } from 'lucide-react';

import { ADMIN_EMAIL, ADMIN_WHATSAPP } from '@src/config/env';

interface ContactAdminButtonsProps {
  subject: string;
  message: string;
}

const primaryClass =
  'flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/30';

const secondaryClass =
  'flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800';

export default function ContactAdminButtons({ subject, message }: ContactAdminButtonsProps) {
  const emailHref =
    `mailto:${ADMIN_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(message)}`;

  const whatsappHref = ADMIN_WHATSAPP
    ? `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <div className="space-y-3">
      {whatsappHref && (
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={primaryClass}>
          <MessageCircle className="size-4" />
          Hubungi via WhatsApp
        </a>
      )}

      {/* Kalau WhatsApp tidak ada, email jadi tombol utama */}
      <a href={emailHref} className={whatsappHref ? secondaryClass : primaryClass}>
        <Mail className="size-4" />
        Kirim email ke admin
      </a>
    </div>
  );
}