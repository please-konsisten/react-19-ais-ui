import React, { useState } from 'react';

export default function LoginPage() {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Logging in with:', { nim, password });
  };

  return (
    // 1. HALAMAN UTAMA (Latar belakang polos abu-abu sangat muda khas dasbor)
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center p-4 font-sans text-[#2d3748]">
      
      {/* 2. KOMPONEN KARTU LOGIN (Bisa Anda potong/pisah dari sini) */}
      <div className="w-full max-w-110 bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1a202c] mb-2">
            Selamat Datang Kembali!
          </h1>
          <p className="text-sm text-[#718096]">
            Silakan masuk ke akun Anda.
          </p>
        </div>

        {/* Formulir */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Input NIM */}
          <div className="space-y-2">
            <label htmlFor="nim" className="block text-sm font-semibold text-[#4a5568]">
              Nomor Induk Mahasiswa (NIM)
            </label>
            <div className="relative flex items-center">
              {/* Ikon Pengguna SVG */}
              <svg className="absolute left-3.5 w-5 height-5 fill-[#a0aec0] pointer-events-none" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <input
                id="nim"
                type="text"
                required
                autoComplete="username"
                placeholder="Masukkan NIM Anda"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#2d3748] placeholder-[#a0aec0] outline-none transition-all duration-200 focus:border-[#b81d43] focus:ring-4 focus:ring-[#b81d43]/10"
              />
            </div>
          </div>

          {/* Input Kata Sandi */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-[#4a5568]">
              Kata Sandi
            </label>
            <div className="relative flex items-center">
              {/* Ikon Gembok SVG */}
              <svg className="absolute left-3.5 w-5 height-5 fill-[#a0aec0] pointer-events-none" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Masukkan Kata Sandi Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#2d3748] placeholder-[#a0aec0] outline-none transition-all duration-200 focus:border-[#b81d43] focus:ring-4 focus:ring-[#b81d43]/10"
              />
              {/* Tombol Lihat/Sembunyikan Sandi */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 bg-none border-none cursor-pointer p-0 flex items-center"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                <svg 
                  className={`w-5 height-5 transition-colors duration-200 ${showPassword ? 'fill-[#b81d43]' : 'fill-[#a0aec0]'}`} 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Lupa Kata Sandi */}
          <div className="flex justify-end pt-1">
            <a href="#forgot" className="text-xs font-medium text-[#b81d43] hover:underline hover:text-[#911231] transition-colors">
              Lupa Kata Sandi?
            </a>
          </div>

          {/* Tombol Aksi */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#b81d43] text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#911231] focus:outline-none focus:ring-4 focus:ring-[#b81d43]/20"
          >
            MASUK
          </button>

        </form>

        {/* Footer Info */}
        <div className="text-center text-xs text-[#718096] mt-6">
          Belum punya akun? <a href="#admin" className="text-[#b81d43] font-semibold hover:underline">Hubungi Administrasi</a>
        </div>

      </div>
      {/* 3. AKHIR KOMPONEN KARTU LOGIN */}

    </div>
  );
}
