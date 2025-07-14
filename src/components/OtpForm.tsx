"use client";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "@/utils/api";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
export default function OtpForm() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
 const router = useRouter();
  
  const email = typeof window !== "undefined" ? localStorage.getItem("signup_email") : "";
 useEffect(() => {
  if (!email) {
    router.replace("/signup");
  }
}, [email, router]);
  
  const handleChange = (value: string, idx: number) => {
    if (!/^\d*$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    
    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  
 const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMsg("");

  try {
    const otpStr = otp.join("");
    const res = await apiFetch("/api/users/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp: otpStr }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("OTP verified! Welcome to MyJobb 🎉");
      router.push("/dashboard");
    } else {
      toast.error(data.message || "Invalid OTP. Try again.");
      setMsg(data.message || "Invalid OTP. Try again.");
    }
  } catch {
    toast.error("Network error. Please try again.");
    setMsg("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};


 const handleResend = async () => {
  setResendDisabled(true);
  setMsg("");
  const res = await apiFetch("/resend-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (res.ok) {
    setMsg("OTP resent! Check your email.");
    toast.success("OTP resent! Check your email.");

  } else {
    setMsg(data.message || "Could not resend OTP.");
    toast.error(data.message || "Could not resend OTP.");
  }
  setTimeout(() => setResendDisabled(false), 30000);
};

  return (
    <form onSubmit={handleVerify} className="space-y-5 ">
      <h2 className="text-3xl text-black font-bold mb-2">Verify OTP</h2>
      <p className="text-black mb-4">
        Enter the OTP sent to <b>{email}</b>
      </p>
     <div className="flex flex-wrap justify-center gap-1">
  {otp.map((digit, idx) => (
    <input
      key={idx}
      ref={el => { inputsRef.current[idx] = el; }}
      type="text"
      inputMode="numeric"
      maxLength={1}
      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-2xl text-center text-black border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
      value={digit}
      onChange={e => handleChange(e.target.value, idx)}
      onKeyDown={e => handleKeyDown(e, idx)}
      autoFocus={idx === 0}
    />
  ))}
</div>

      <button
        className="w-full bg-green-700 text-white rounded-full p-3 font-semibold hover:bg-black transition  flex justify-center items-center"
        type="submit"
        disabled={loading}
      >
         {loading ? (
    <FaSpinner className="animate-spin " />
  ) : (
    "Verify OTP"
  )}
      </button>
      <button
        type="button"
        className="w-full bg-gray-200 text-green-700 rounded-full p-3 font-semibold mt-2 hover:bg-gray-300 transition"
        onClick={handleResend}
        disabled={resendDisabled}
      >
        {resendDisabled ? "Resend OTP (wait...)" : "Resend OTP"}
      </button>
      {msg && <div className="text-green-700 text-center">{msg}</div>}
    </form>
  );
}
