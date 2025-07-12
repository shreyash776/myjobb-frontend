import React from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden">
        
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {children}
        </div>
        
        <div
          className="hidden md:flex md:w-1/2 relative items-center justify-center p-0"
          style={{ aspectRatio: "540/510", minHeight: 0 ,backgroundColor: "#f6faf4" }}
        >
          <Image
            src="/assets/login.png"
            alt="Login Illustration"
            fill
            className="object-contain"
            priority
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  );
}
