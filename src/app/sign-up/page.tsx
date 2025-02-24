'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // In a real app, this would connect to your sign-up API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to login page
      router.push('/login');
    }, 1500);
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/logo.svg"
              alt="Astra Medical Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Create an Account
          </h1>
          <p className="mt-2 text-gray-600">
            Join Astra Medical for streamlined billing
          </p>
        </div>
        
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center pb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              Sign up
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="w-full"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>

              <div className="text-center mt-4">
                <span className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </span>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}