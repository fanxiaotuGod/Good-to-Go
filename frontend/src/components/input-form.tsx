"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
})

export function LoginForm() {
  const [isRegistering, setIsRegistering] = useState(false)

  const form = useForm<z.infer<typeof loginSchema | typeof registerSchema>>({
    resolver: zodResolver(isRegistering ? registerSchema : loginSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: any) {
    if (isRegistering) {
      console.log("Registering user:", data)
      // Send to /api/register
    } else {
      console.log("Logging in user:", data)
      // Send to /api/login
    }
  }

  

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        {isRegistering ? "Create an Account" : "Login to your Account"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isRegistering && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full">
            {isRegistering ? "Register" : "Login"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        {isRegistering ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="text-blue-600 hover:underline ml-1"
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </div>
    </div>
  )
}
