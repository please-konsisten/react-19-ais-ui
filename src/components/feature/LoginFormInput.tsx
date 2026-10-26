
function LoginFormInputNIM() {
  return (
    <div className="space-y-2">
      <label htmlFor="nim" className="block text-sm font-semibold text-[#4a5568]">
        Nomor Induk Mahasiswa (NIM)
      </label>
      <div className="relative flex items-center">
        {/* Ikon Pengguna SVG */}
        <svg className="absolute left-3.5 w-5 height-5 fill-[#a0aec0] pointer-events-none" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        <input
          id="nim"
          type="text"
          required
          autoComplete="username"
          placeholder="Masukkan NIM Anda"
          className="w-full pl-11 pr-4 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#2d3748] placeholder-[#a0aec0] outline-none transition-all duration-200 focus:border-[#b81d43] focus:ring-4 focus:ring-[#b81d43]/10"
        />
      </div>
    </div>
  )
}

function LoginFormInputPassword() {
  return (

    <div className="space-y-2">
      <label htmlFor="password" className="block text-sm font-semibold text-[#4a5568]">
        Kata Sandi
      </label>
      <div className="relative flex items-center">
        <svg className="absolute left-3.5 w-5 height-5 fill-[#a0aec0] pointer-events-none" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
        </svg>
        <input
          id="password"
          type='password'
          required
          autoComplete="current-password"
          placeholder="Masukkan Kata Sandi Anda"
          className="w-full pl-11 pr-11 py-3 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#2d3748] placeholder-[#a0aec0] outline-none transition-all duration-200 focus:border-[#b81d43] focus:ring-4 focus:ring-[#b81d43]/10"
        />
      </div>
    </div>
  )
}

export {
  LoginFormInputNIM,
  LoginFormInputPassword
}