"use client"

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "cn";
import { Link } from "react-router";

interface FormProps {
  submitHandler: (data: any) => void;
  errorMessage: any;
}

export default function LoginForm(props: FormProps) {
  const onSubmitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    props.submitHandler(data);
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* User Account Input */}
        <div className="grid gap-2">
          <Label htmlFor="userAccount" className={cn("pl-1")}>User Account</Label>
          <Input
            id="userAccount"
            type="userAccount"
            name="userAccount"
            placeholder="m@example.com"
            className={cn("rounded-md")}
            required
          />
        </div>
        {/* Password Input */}
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className={cn("pl-1")}>Password</Label>
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            className={cn("rounded-md")}
            required
          />
        </div>
      </div>
      <Button
        className={cn(`
          w-full bg-[#b81d43] hover:bg-[#991535] active:bg-[#7a102a] focus:outline-none focus:ring-2 
          focus:ring-[#b81d43] focus:ring-offset-2 transition-colors duration-200 text-white py-4
          rounded-md
        `)}
        type="submit"
        children="Submit"
      />
    </form>
  )
}