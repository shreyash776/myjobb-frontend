import AuthLayout from "@/components/AuthLayout";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
