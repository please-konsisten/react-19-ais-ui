import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "Aplikasi mengalami masalah internal yang tidak terduga.";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    if (error.status === 404) {
      errorMessage = "Halaman yang Anda cari tidak dapat ditemukan.";
    } else if (error.status === 401) {
      errorMessage = "Anda tidak memiliki akses untuk melihat halaman ini.";
    } else {
      errorMessage = error.data?.message || errorMessage;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Ikon Peringatan Tailwind */}
        <div className="flex justify-center text-red-500">
          <svg className="w-24 h-24 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Status & Pesan Error */}
        <div className="space-y-2">
          <span className="text-sm font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider">
            Error {errorStatus}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
            Terjadi Kesalahan!
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400">
            {errorMessage}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
          >
            Coba Lagi
          </button>
          
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>

      </div>
    </div>
  );
}
