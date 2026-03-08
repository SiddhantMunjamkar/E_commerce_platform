"use client";

import { ShieldCheck, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { ShoppingCart, House, CreditCard } from "lucide-react";

export default function CheckoutHeader() {
  const pathname = usePathname();

  const steps = [
    { label: "Cart", path: "/", icon: ShoppingCart },
    { label: "Address", path: "/checkout", icon: House },
    { label: "Payment", path: "/payment", icon: CreditCard },
  ];

  const currentStep = steps.findIndex((step) => pathname === step.path);

  function getStatus(idx: number) {
    if (idx < currentStep) return "completed";
    if (idx === currentStep) return "current";
    return "upcoming";
  }

  function StepCircle({ idx }: { idx: number }) {
    const status = getStatus(idx);
    if (status === "completed") {
      return (
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm shadow-emerald-300">
          <Check size={14} strokeWidth={3} />
        </span>
      );
    }
    if (status === "current") {
      return (
        <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-emerald-500 bg-white shadow-sm shadow-emerald-100">
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
        </span>
      );
    }
    return (
      <span className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-slate-200 bg-white text-xs font-semibold text-slate-400">
        {idx + 1}
      </span>
    );
  }

  return (
    <header className="w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.5 4.5C17.5 4.5 7.5 7.5 4.5 20.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <path d="M23.5 4.5C23.5 4.5 23.5 13.5 15.5 20.5C10.5 24.5 4.5 20.5 4.5 20.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <path d="M10.5 17.5C12.5 18.5 16.5 17.5 19.5 13.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Ecoyaan</span>
        </div>

        {/* Step indicator */}
        <nav className="hidden md:flex items-center gap-0">
          {steps.map((step, idx) => {
            const status = getStatus(idx);
            return (
              <div key={step.label} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  status === "current"
                    ? "text-emerald-600"
                    : status === "completed"
                    ? "text-emerald-500"
                    : "text-slate-400"
                }`}>
                  <StepCircle idx={idx} />
                  <step.icon size={14} />
                  <span>{step.label}</span>
                </div>

                {idx < steps.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${
                    getStatus(idx) === "completed" ? "bg-emerald-400" : "bg-slate-200"
                  }`} />
                )}
              </div>
            );
          })}
        </nav>

        {/* Secure badge */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <ShieldCheck size={15} className="text-slate-400" />
          <span className="hidden sm:block">Secure Checkout</span>
        </div>
      </div>
    </header>
  );
}
