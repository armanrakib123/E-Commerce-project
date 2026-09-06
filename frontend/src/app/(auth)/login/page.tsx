import React from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Container } from "@/components/layout/Container";

export default function LoginPage() {
  return (
    <div className="py-12 sm:py-20 flex items-center justify-center">
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
}
