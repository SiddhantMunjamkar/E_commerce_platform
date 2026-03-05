"use client";

import { Button } from "@/components/ui/button";
import { Check, Truck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function OrderSuccessPage() {
  const { cartItems, subtotal, shippingFee, discount, total, address } = useCart();
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* MAIN */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <div className="w-full max-w-[600px] flex flex-col items-center text-center gap-8">
          {/* SUCCESS ICON */}
          <div className="relative w-24 h-24 rounded-full bg-emerald-400/20 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <Check size={36} />
            </div>

            {/* animated ring */}
            <div className="absolute inset-0 rounded-full border border-emerald-400/40 animate-ping"></div>
          </div>

          {/* TITLE */}
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-bold">
              Order Successful!
            </h1>

            <p className="text-muted-foreground text-lg max-w-md">
              Thank you for choosing sustainable products. Your conscious choice
              makes a difference.
            </p>
          </div>

          {/* ORDER INFO CARD */}
          <div className="w-full bg-[#f6f8f7] border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            {/* ORDER ID */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                Order Reference
              </span>

              <p className="text-xl font-bold">#EY-10293</p>
            </div>

            {/* divider */}
            <div className="h-px w-full md:w-px md:h-12 bg-gray-200"></div>

            {/* DELIVERY */}
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                Estimated Delivery
              </span>

              <div className="flex items-center gap-2">
                <Truck size={18} className="text-emerald-500" />

                <p className="text-lg font-semibold">Oct 24 - Oct 26</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row w-full gap-4 mt-4">
            <Button
              className="flex-1 h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold shadow-lg"
              asChild
            >
              <Link href="/">Continue Shopping</Link>
            </Button>

            <Button variant="outline" className="flex-1 h-14 font-semibold">
              View Order Details
            </Button>
          </div>

          {/* NOTE */}
          <p className="text-sm text-muted-foreground mt-2">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t text-center">
        <p className="text-sm text-muted-foreground">
          © 2023 Ecoyaan. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
