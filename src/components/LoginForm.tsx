"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/utils/api";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMsg("");

  try {
    const res = await apiFetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("signup_email", email);
      toast.success("Login successful! Welcome back to MyJobb 🎉");
      router.push("/dashboard");
    } else {
      setMsg(data.message || "Login failed. Try again.");
    }
  } catch {
    setMsg("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <h2 className="text-3xl font-bold mb-2 text-black">Welcome back!</h2>
      <p className="text-black mb-4">Login to continue with <b>Myjobb</b>.</p>
      <input
        className="w-full border rounded-full text-black p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="w-full border text-black rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="flex justify-end">
        <Link href="#" className="text-xs text-gray-500 hover:underline">Forgot Password?</Link>
      </div>
      <button
  className="w-full bg-black text-white rounded-full p-3 font-semibold hover:bg-green-700 transition flex justify-center items-center"
  type="submit"
  disabled={loading}
>
  {loading ? (
    <FaSpinner className="animate-spin" />
  ) : (
    "Login"
  )}
</button>

      {msg && <div className="text-red-500 text-center">{msg}</div>}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-200" />
        <span className="mx-2 text-gray-400 text-sm">or continue with</span>
        <hr className="flex-grow border-gray-200" />
      </div>
      
      <div className="text-center text-gray-400 mt-4">
        Not a member?{" "}
        <Link href="/signup" className="text-green-700 font-semibold hover:underline">
          Register now
        </Link>
      </div>
    </form>
  );
}
