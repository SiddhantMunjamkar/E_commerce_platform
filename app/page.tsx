"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import CheckoutHeader from "@/components/checkout-header";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function CartPage() {
  const {
    cartItems,
    subtotal,
    shippingFee,
    discount,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    loadCartFromAPI,
    setShippingFee,
    setDiscount,
  } = useCart();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const fetchCartData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cart`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          loadCartFromAPI(data.cartItems);
          setShippingFee(data.shippingFee || 0);
          setDiscount(data.discount || 0);
        }
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CheckoutHeader />

      <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-28 lg:pb-12">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Cart</h1>
          <p className="text-slate-500 mt-1.5 text-sm">
            Not ready to checkout?{" "}
            <span className="text-emerald-600 font-semibold cursor-pointer hover:text-emerald-700 transition-colors">
              Continue shopping
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ── LEFT: Cart items ── */}
          <div className="lg:col-span-8">
            <Card className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {cartItems.length === 0 ? (
                  <div className="py-16 text-center text-slate-400 text-sm">
                    Your cart is empty
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row gap-5 p-6 transition-colors hover:bg-slate-50/60 ${
                        index !== cartItems.length - 1 ? "border-b border-slate-100" : ""
                      }`}
                    >
                      {/* Product image */}
                      <div className="shrink-0">
                        <Image
                          src={item.image}
                          width={112}
                          height={112}
                          alt={item.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border border-slate-100 bg-slate-50 object-cover"
                        />
                      </div>

                      {/* Product details */}
                      <div className="flex flex-1 flex-col justify-between gap-4">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-semibold text-slate-900 text-base leading-snug">
                              {item.name}
                            </h3>
                            <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
                          </div>
                          <span className="font-bold text-lg text-slate-900 whitespace-nowrap">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity stepper */}
                          <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden h-9">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-9 h-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-slate-800 select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="w-9 h-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-500 transition-colors group"
                          >
                            <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* ── RIGHT: Order summary (sticky on desktop) ── */}
          <div className="lg:col-span-4">
            <Card className="rounded-2xl border border-slate-200 shadow-sm p-6 lg:sticky lg:top-24">
              <h2 className="font-bold text-lg text-slate-900 mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className={`font-medium ${shippingFee === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                    {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Free"}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Eco Discount</span>
                    <span>−${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="font-bold text-slate-900">Total</p>
                  <p className="text-xs text-slate-400 mt-0.5">Incl. taxes where applicable</p>
                </div>
                <span className="text-2xl font-extrabold text-slate-900">${total.toFixed(2)}</span>
              </div>

              <div className="mt-6 hidden lg:block">
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-bold h-12 shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Free returns within 30 days
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Sticky CTA bar (mobile only) ── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-slate-200 shadow-xl z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500">Total</p>
            <p className="font-bold text-slate-900">${total.toFixed(2)}</p>
          </div>
          <Link href="/checkout" className="shrink-0">
            <Button
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-bold h-12 px-8 shadow-md shadow-emerald-500/25 flex items-center gap-2 transition-all"
            >
              Checkout
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
