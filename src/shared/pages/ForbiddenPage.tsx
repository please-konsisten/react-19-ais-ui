import { Link } from 'react-router';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Error 403</span>
      <h1 className="text-3xl font-extrabold text-gray-900">Akses Ditolak</h1>
      <p className="text-gray-500">Anda tidak memiliki akses ke halaman ini.</p>
      <Link to="/dashboard" className="px-6 py-3 rounded-lg text-white bg-red-600 hover:bg-red-700">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
