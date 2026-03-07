"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import CheckoutHeader from "@/components/checkout-header";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, subtotal, shippingFee, discount, total, address } =
    useCart();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Heading */}
      <CheckoutHeader />
      <div className="min-h-screen bg-[#f6f8f7]">
        <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h2 className="text-2xl font-bold mb-4 md:mb-6">Order Summary</h2>

              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 sm:p-6 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.name}
                      className="rounded-lg border bg-gray-50 w-16 h-16 sm:w-20 sm:h-20 object-cover"
                    />

                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.desc}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* SHIPPING DETAILS */}
              <Card className="p-6 rounded-xl border">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <h3 className="text-lg font-semibold">Shipping Details</h3>

                  <Link
                    href="/checkout"
                    className="text-emerald-500 text-sm font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </div>

                <div className="space-y-3 text-sm">
                  {address ? (
                    <>
                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Name</span>
                        <span className="col-span-2 font-medium">
                          {address.fullName}
                        </span>
                      </div>

                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Email</span>
                        <span className="col-span-2 font-medium">
                          {address.email}
                        </span>
                      </div>

                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Phone</span>
                        <span className="col-span-2 font-medium">
                          {address.phone}
                        </span>
                      </div>

                      <div className="grid grid-cols-3">
                        <span className="text-muted-foreground">Address</span>

                        <span className="col-span-2 font-medium leading-relaxed">
                          {address.street} {address.city} {address.pincode},{" "}
                          {address.state} {address.country}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground">No address provided</p>
                  )}
                </div>
              </Card>

              {/* PAYMENT CARD */}
              <Card className="p-6 rounded-xl border shadow-md relative overflow-hidden">
                <h3 className="text-lg font-semibold mb-6">Payment</h3>

                <div className="space-y-3 mb-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      ${shippingFee > 0 ? shippingFee.toFixed(2) : "0.00"}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-emerald-500">
                        -${discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="font-semibold">Grand Total</span>
                    <span className="text-2xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/success")}
                  className="w-full  bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock size={18} />
                  Pay Securely
                </Button>

                <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground mt-1">
                  <ShieldCheck size={14} />
                  Payments are secure and encrypted
                </div>

                <div className="text-center mt-1">
                  <Link
                    href="/checkout"
                    className="text-sm text-muted-foreground hover:text-black"
                  >
                    ← Back to Shipping
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
