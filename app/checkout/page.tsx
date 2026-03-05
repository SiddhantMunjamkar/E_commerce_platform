"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft ,ArrowRight } from "lucide-react";
import Link from "next/link";
import CheckoutHeader from "@/components/checkout-header";
import { useCart } from "@/contexts/CartContext";
import { Address } from "@/types/cart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShippingAddressPage() {
  const router = useRouter();
  const { address, setAddress } = useCart();
  const [formData, setFormData] = useState<Address>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "United States",
  });

  // Prefill form with existing address from context
  useEffect(() => {
    if (address) {
      setFormData(address);
    }
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save address to context
    setAddress(formData);
    // Navigate to payment page
    router.push("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Heading */}
      <CheckoutHeader />

      <div className="min-h-screen bg-[#f6f8f7] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-2xl p-8 sm:p-12 rounded-2xl shadow-sm border">
          {/* Heading */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-2">Shipping Address</h1>

            <p className="text-sm text-muted-foreground">
              Please enter your shipping details to proceed with your
              eco-friendly order.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Full Name
              </label>
              <Input 
                placeholder="Jane Doe" 
                className="rounded-xl h-11"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="jane.doe@example.com"
                className="rounded-xl h-11"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="rounded-xl h-11"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Street Address
              </label>
              <Input
                placeholder="123 Eco Way, Apt 4B"
                className="rounded-xl h-11"
                value={formData.street}
                onChange={(e) => setFormData({...formData, street: e.target.value})}
                required
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  City
                </label>
                <Input 
                  placeholder="Greenville"
                  className="rounded-xl h-11"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  State / Province
                </label>
                <Input 
                  placeholder="CA"
                  className="rounded-xl h-11"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Pincode and Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  ZIP / Postal Code
                </label>
                <Input
                  placeholder="90210"
                  className="rounded-xl h-11"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Country
                </label>
                <select
                  className="w-full rounded-xl h-11 px-4 border border-input focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>India</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="pt-6 mt-6 border-t flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-black"
              >
                <ArrowLeft size={16} />
                Return to Cart
              </Link>

              <Button 
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-3 rounded-xl font-semibold w-full sm:w-auto"
              >
                Continue to Payment <ArrowRight size={18} />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
