"use client";

import { ShieldCheck, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { ShoppingCart, House, CreditCard } from "lucide-react";

export default function CheckoutHeader() {
  const pathname = usePathname();

  // Define steps and their corresponding paths
  const steps = [
    { label: "Cart", path: "/", icon: ShoppingCart },
    { label: "Address", path: "/checkout", icon: House },
    { label: "Payment", path: "/payment", icon: CreditCard },
  ];

  // Find current step index
  const currentStep = steps.findIndex((step) => pathname === step.path);

  function getStepStatus(idx: number) {
    if (idx < currentStep) return "completed";
    if (idx === currentStep) return "current";
    return "upcoming";
  }

  function renderStepCircle(idx: number) {
    const status = getStepStatus(idx);
    if (status === "completed") {
      return (
        <span className="w-6 h-6 flex items-center justify-center rounded-full border border-emerald-400 text-emerald-500 bg-white">
          <Check size={16} />
        </span>
      );
    }
    if (status === "current") {
      return (
        <span className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-emerald-400 text-emerald-500 bg-white">
          <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-400   flex items-center justify-center" />
        </span>
      );
    }
    // upcoming
    return (
      <span className="w-6 h-6 flex items-center justify-center rounded-full border text-gray-300 bg-white">
        {idx + 1}
      </span>
    );
  }
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold text-lg">
          {/* Leaf Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-emerald-400"
          >
            <g>
              <path
                d="M23.5 4.5C17.5 4.5 7.5 7.5 4.5 20.5"
                stroke="#13ec92"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M23.5 4.5C23.5 4.5 23.5 13.5 15.5 20.5C10.5 24.5 4.5 20.5 4.5 20.5"
                stroke="#13ec92"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10.5 17.5C12.5 18.5 16.5 17.5 19.5 13.5"
                stroke="#13ec92"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </svg>
          <span className="font-bold">Ecoyaan</span>
        </div>

        {/* Progress Steps */}
        <div className="hidden md:flex items-center text-sm font-medium gap-4">
          {steps.map((step, idx) => (
            <div key={step.label + idx} className="flex items-center gap-4">
              <div
                className={`flex items-center gap-2 ${
                  getStepStatus(idx) === "current"
                    ? "text-emerald-500"
                    : getStepStatus(idx) === "completed"
                      ? "text-emerald-500"
                      : "text-gray-400"
                }`}
              >
                {renderStepCircle(idx)}
                {step.icon && <step.icon size={16} />}
                {step.label}
              </div>
              {idx < steps.length - 1 && (
                <span className="text-gray-300" key={"sep-" + idx}>
                  ›
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Secure Checkout */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <ShieldCheck size={16} />
          <span className="hidden sm:block">Secure Checkout</span>
        </div>
      </div>
    </header>
  );
}
