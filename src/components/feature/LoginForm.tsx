"use client"

import type React from "react"

interface FormProps {
  children: React.ReactNode;
  requestHandler: (data: any) => void;
}

export default function LoginForm(props: FormProps) {
  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    props.requestHandler(data);
  };
  
  return (
    <form className="space-y-5" onSubmit={submitHandler}>
      {props.children}
      <LoginFormFooter />
    </form>
  )
}

function LoginFormFooter() {
  return (
    <>
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
    </>
  )
}