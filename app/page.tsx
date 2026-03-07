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
    <div className="min-h-screen bg-gray-50">
      {/* Heading */}
      <CheckoutHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>

          <p className="text-muted-foreground mt-2">
            Not ready to checkout?{" "}
            <span className="text-emerald-500 font-medium cursor-pointer">
              Continue shopping
            </span>
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8">
            <Card className="rounded-xl border shadow-sm">
              <CardContent className="p-0">
                {cartItems.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    Your cart is empty
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row gap-6 p-6 ${
                        index !== cartItems.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      {/* Image */}
                      <Image
                        src={item.image}
                        width={128}
                        height={128}
                        alt={item.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border bg-gray-50 object-cover"
                      />

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.desc}
                            </p>
                          </div>

                          <span className="font-bold text-lg">
                            ${item.price}.00
                          </span>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex justify-between items-center mt-4">
                          {/* Quantity */}
                          <div className="flex items-center border rounded-lg h-10 w-28">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
                            >
                              <Minus size={16} />
                            </button>

                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-8 text-center text-sm outline-none bg-transparent"
                            />

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-l-lg transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 size={16} />
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4">
            <Card className="p-6 rounded-xl border shadow-sm lg:sticky lg:top-24">
              <h2 className="font-bold text-xl mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Free"}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Eco Discount applied</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator className="" />

              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-semibold">Total</p>
                  <p className="text-xs text-muted-foreground">
                    Including taxes if applicable
                  </p>
                </div>

                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <Button
                  className="w-full  bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Free returns within 30 days
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
