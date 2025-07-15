"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/utils/api"
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
export default function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

 const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setMsg("");
  setLoading(true);

  try {
    const res = await apiFetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ name: username, email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("signup_email", email);
      toast.success("OTP sent successfully! Please check your email.");
      router.push("/otp");
    } else {
      toast.error(data.message || "Signup failed. Try again.");
      setMsg(data.message || "Signup failed. Try again.");
    }
  } catch (err) {
    console.error("Signup error:", err);
    toast.error("An unexpected error occurred. Please try again later.");
    setMsg("An unexpected error occurred. Please try again later.");
  } finally {
    setLoading(false); 
  }
};

  return (
    <form onSubmit={handleSignup} className="space-y-5">
      <h2 className="text-3xl text-black font-bold mb-2">Create Account</h2>
      <p className="text-black mb-4">Sign up to get started with <b>Myjobb</b>.</p>
      <input
        className="w-full text-black border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
        disabled={loading}
      />
      <input
        className="w-full text-black border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
      disabled={loading}
        className="w-full text-black border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        className="w-full text-black bg-black text-white rounded-full p-3 font-semibold hover:bg-green-700 transition  flex justify-center items-center"
        type="submit"
        disabled={loading}
        
      >
        {loading ? (
    <FaSpinner className="animate-spin " />
  ) : (
    "Sign up"
  )}
      </button>

      {/* <Link
  href="/otp"
  className="block w-full text-center bg-black text-white rounded-full p-3 font-semibold hover:bg-green-700 transition"
>
  Sign up
</Link> */}
      {msg && <div className="text-red-500 text-center">{msg}</div>}
      <div className="text-center text-gray-400 mt-4">
        Already have an account?{" "}
        <Link href="/" className="text-green-700 font-semibold hover:underline">
          Login
        </Link>
      </div>
    </form>
  );
}
