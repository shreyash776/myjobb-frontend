"use client";
import { useRef, useState } from "react";

export default function OtpForm() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  
  const email = typeof window !== "undefined" ? localStorage.getItem("signup_email") : "";

  
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
    const otpStr = otp.join("");
    
    setTimeout(() => {
      setLoading(false);
      if (otpStr === "123456") {
        setMsg("OTP verified! (demo)");
        
      } else {
        setMsg("Invalid OTP. Try again.");
      }
    }, 1000);
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setMsg("OTP resent! (demo)");
    setTimeout(() => setResendDisabled(false), 30000); // 30s cooldown
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
        className="w-full bg-green-700 text-white rounded-full p-3 font-semibold hover:bg-black transition"
        type="submit"
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify"}
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
