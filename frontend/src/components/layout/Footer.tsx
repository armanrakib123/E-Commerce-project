import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { ShieldCheck, Truck, Headphones, RotateCcw } from "lucide-react";

export function Footer() {
  const perks = [
    {
      icon: <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      title: "Fast Worldwide Shipping",
      desc: "Tracked dispatch directly to your doorstep",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: "100% Authentic Guarantee",
      desc: "Direct from verified manufacturers",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      title: "30-Day Hassle-Free Returns",
      desc: "Instant return processing & refunds",
    },
    {
      icon: <Headphones className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      title: "24/7 Dedicated Support",
      desc: "Expert customer assistance anytime",
    },
  ];

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Perks Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 py-8">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700/60">
                  {p.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="relative h-9 w-36">
              <Image src="/images/logo/logo.svg" alt="NovaStore" fill className="object-contain" />
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              Curated flagship tech, premium audio, workstation essentials, and smart lifestyle gear
              engineered for modern digital creators.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-400">Supported Payments:</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">VISA</span>
                <span className="px-2 py-1 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Mastercard</span>
                <span className="px-2 py-1 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">bKash</span>
                <span className="px-2 py-1 text-[10px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">COD</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/products?category_id=1" className="hover:text-indigo-600 transition">Electronics</Link></li>
              <li><Link href="/products?category_id=2" className="hover:text-indigo-600 transition">Premium Audio</Link></li>
              <li><Link href="/products?category_id=3" className="hover:text-indigo-600 transition">Wearables</Link></li>
              <li><Link href="/products?category_id=4" className="hover:text-indigo-600 transition">Workstations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="/orders" className="hover:text-indigo-600 transition">Track Orders</Link></li>
              <li><Link href="/profile" className="hover:text-indigo-600 transition">Account Settings</Link></li>
              <li><Link href="/cart" className="hover:text-indigo-600 transition">Shopping Bag</Link></li>
              <li><Link href="/notifications" className="hover:text-indigo-600 transition">Notification Inbox</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">Stay Updated</h4>
            <p className="text-xs text-slate-500 mb-3">Get exclusive discounts and new product releases directly.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                className="w-full rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} NovaStore Ecommerce. Built with Next.js & Laravel API.</p>
          <div className="flex items-center gap-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Security</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
