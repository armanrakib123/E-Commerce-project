"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, Package, Bell, Shield, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Container className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In Required</h2>
        <p className="mt-2 text-sm text-slate-500">
          Please sign in to your account to view profile settings and history.
        </p>
        <Link href="/login" className="mt-6 inline-block">
          <Button variant="primary" size="md">
            Sign In Now
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <div className="py-8 sm:py-12">
      <Container className="max-w-4xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              My Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your personal information, address, and preferences
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            className="gap-1.5 text-xs text-rose-600 border-rose-200 dark:border-rose-900 hover:bg-rose-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 text-center space-y-4 shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-3xl font-extrabold text-white shadow-xl shadow-indigo-500/20">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h3>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <div className="pt-2">
              <span className="rounded-full bg-indigo-50 dark:bg-indigo-950 px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 capitalize">
                Role: {user.role || "Customer"}
              </span>
            </div>

            {isAdmin && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link href="/admin">
                  <Button variant="secondary" size="sm" className="w-full gap-2 text-xs bg-purple-50 text-purple-700 hover:bg-purple-100">
                    <Shield className="w-3.5 h-3.5" />
                    Open Admin Hub
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Details & Quick Links */}
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
                Contact & Shipping Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <User className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Full Name</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{user.name}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{user.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <Phone className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Phone</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {user.phone || "+1 (555) 234-5678"}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block">Default Shipping Address</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {user.address || "742 Evergreen Terrace, Springfield"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick shortcuts */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/orders"
                className="flex items-center gap-3 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 transition shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">My Orders</h4>
                  <p className="text-xs text-slate-400">View order status & history</p>
                </div>
              </Link>

              <Link
                href="/notifications"
                className="flex items-center gap-3 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 transition shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Alerts</h4>
                  <p className="text-xs text-slate-400">Notifications & updates</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
