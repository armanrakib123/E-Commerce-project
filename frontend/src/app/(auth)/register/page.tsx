import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Container } from "@/components/layout/Container";

export default function RegisterPage() {
  return (
    <div className="py-12 sm:py-20 flex items-center justify-center">
      <Container>
        <RegisterForm />
      </Container>
    </div>
  );
}
