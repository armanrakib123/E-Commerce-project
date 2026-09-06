"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { extractErrorMessage } from "@/lib/api-error";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login({ email, password });
      router.push("/");
    } catch (err: unknown) {
      setError(extractErrorMessage(err, "Invalid credentials. Please verify your email and password."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (type: "customer" | "admin") => {
    if (type === "admin") {
      setEmail("admin@ecommerce.com");
      setPassword("password");
    } else {
      setEmail("alex@example.com");
      setPassword("password");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 mb-1">
          <LogIn className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-xs text-slate-500">
          Sign in to access your orders, saved items, and personalized feed
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          required
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            <span>Remember me</span>
          </label>
          <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full rounded-xl py-3 shadow-lg shadow-indigo-500/20"
        >
          Sign In
        </Button>
      </form>

      {/* Quick demo presets */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-[11px] text-slate-400 mb-2">Quick Fill Demo Accounts:</p>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill("customer")}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            Customer (alex@example.com)
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("admin")}
            className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition"
          >
            Admin (admin@ecommerce.com)
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link href="/register" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
          Create an Account
        </Link>
      </div>
    </div>
  );
}
