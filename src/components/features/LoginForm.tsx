"use client"

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface FormProps {
  submitHandler: (data: any) => void;
}

export default function LoginForm(props: FormProps) {
  const onSubmitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    props.submitHandler(data);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="userAccount">User Account</Label>
          <Input
            id="userAccount"
            type="userAccount"
            name="userAccount"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            name="password" 
            placeholder="********"
            required 
          />
        </div>
      </div>
      <Button type="submit" children="Login"/>
    </form>
  )
}