"use client";


import Image from "next/image";
import { Lock, ShieldCheck, Tag, } from "lucide-react";
import Link from "next/link";
import CheckoutHeader from "@/components/checkout-header";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, subtotal, shippingFee, discount, total, address } = useCart();
  // const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-32">
      <CheckoutHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">

          {/* LEFT 70% */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Review Your Order</h1>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white p-4 rounded-xl border border-slate-100 flex gap-4 transition-all duration-300 hover:shadow-md hover:border-emerald-500/20"
                >
                  <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} width={96} height={96} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 group-hover:text-emerald-500 transition-colors">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                      <p className="text-xs text-slate-400 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          {/* Payment method selection */}
            {/* <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <h2 className="text-lg font-bold mb-4 text-slate-800">Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === "card" ? "border-emerald-500 bg-emerald-500/5" : "border-slate-200 hover:bg-slate-50"}`}>
                  <input type="radio" name="payment" className="hidden" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-6 h-6 ${paymentMethod === "card" ? "text-emerald-500" : "text-slate-400"}`} />
                    <span className="font-medium text-slate-700">Credit / Debit Card</span>
                  </div>
                  {paymentMethod === "card" && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500" />}
                </label>
                <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === "paypal" ? "border-emerald-500 bg-emerald-500/5" : "border-slate-200 hover:bg-slate-50"}`}>
                  <input type="radio" name="payment" className="hidden" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} />
                  <div className="flex items-center gap-3">
                    <Wallet className={`w-6 h-6 ${paymentMethod === "paypal" ? "text-emerald-500" : "text-slate-400"}`} />
                    <span className="font-medium text-slate-600">PayPal / Digital Wallet</span>
                  </div>
                  {paymentMethod === "paypal" && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500" />}
                </label>
              </div>
            </div> */}
          </div>

          {/* RIGHT 30% sticky */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28 space-y-4">

              {/* Shipping To */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Shipping To</h2>
                  <Link href="/checkout" className="text-xs text-emerald-500 font-bold hover:underline">Change</Link>
                </div>
                {address ? (
                  <>
                    <p className="font-semibold text-slate-800">{address.fullName}</p>
                    <p className="text-sm text-slate-600 mt-1">{address.street}<br />{address.city}, {address.state} {address.pincode}</p>
                    <p className="text-sm text-slate-500 mt-2 italic">Expected delivery: 3-5 business days</p>
                  </>
                ) : (
                  <p className="text-sm text-slate-400">No address provided.</p>
                )}
              </div>

              {/* Price Details */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-5">Price Details</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping Fee</span>
                    <span className={shippingFee === 0 ? "text-emerald-600 font-medium" : ""}>{shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                    <span className="text-base font-bold text-slate-800">Order Total</span>
                    <div className="text-right">
                      <span className="block text-2xl font-extrabold text-slate-900">${total.toFixed(2)}</span>
                      {discount > 0 && <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">You save ${discount.toFixed(2)} today</span>}
                    </div>
                  </div>
                  <div className="pt-3 text-center">
                    <Link href="/checkout" className="text-xs text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center gap-1">
                      ← Back to Address
                    </Link>
                  </div>
                </div>
              </div>

              {/* Coupon applied badge */}
              {discount > 0 && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-dashed border-emerald-200 flex items-center gap-2">
                  <Tag size={16} className="text-emerald-600 shrink-0" />
                  <span className="text-sm font-bold text-emerald-800">Coupon applied</span>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Sticky Pay Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-sm border-t border-slate-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)] py-4 px-4 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 w-full sm:w-auto">
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">You Pay</p>
              <p className="text-2xl font-extrabold text-slate-900">${total.toFixed(2)}</p>
            </div>
            <div className="h-10 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500">VISA</div>
                <div className="w-8 h-5 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-500">MC</div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center text-emerald-600 gap-1">
                  <ShieldCheck size={12} />
                  <span className="text-[11px] font-bold">Secure checkout</span>
                </div>
                <span className="text-[10px] text-slate-400 leading-none">256-bit SSL encrypted</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push("/success")}
            className="w-full sm:w-80 group relative overflow-hidden bg-linear-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Lock size={18} className="text-white/90 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="text-base">Pay Securely ${total.toFixed(2)}</span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none" />
          </button>
        </div>
      </div>
    </div>
  );
}
