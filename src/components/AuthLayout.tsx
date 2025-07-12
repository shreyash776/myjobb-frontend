import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden">
        
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {children}
        </div>
        
        <div className="hidden md:flex md:w-1/2 bg-green-50 flex-col items-center justify-center p-10">
         
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-green-200 w-32 h-32 flex items-center justify-center mb-6">
             
              <span className="text-6xl text-green-700">🧘‍♂️</span>
            </div>
            <h2 className="text-xl font-bold text-green-700 mb-2 text-center">Make your work easier and organized<br />with <span className="font-extrabold">Tuga’s App</span></h2>
            <p className="text-center text-green-800 text-sm">Simplify your workflow and boost your productivity.<br />Get started for free.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
