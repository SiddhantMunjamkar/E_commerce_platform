"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Plus, CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import CheckoutHeader from "@/components/checkout-header";
import { useCart } from "@/contexts/CartContext";
import { Address } from "@/types/cart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShippingAddressPage() {
  const router = useRouter();
  const { setAddress } = useCart();
  
  // Initialize addresses from localStorage immediately
  const [addresses, setAddresses] = useState<Address[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("addresses");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error("Failed to parse addresses:", error);
          return [];
        }
      }
    }
    return [];
  });
  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("addresses");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.length > 0 ? 0 : null;
        } catch {
          return null;
        }
      }
    }
    return null;
  });
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Address>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });
  const [phoneError, setPhoneError] = useState("");

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("addresses", JSON.stringify(addresses));
    }
  }, [addresses]);

  const validatePhone = (phone: string) => {
    const regex = /^\+?\d{0,2}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return regex.test(phone);
  };

  const handleAddClick = () => {
    setEditingIndex(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
    setPhoneError("");
    setShowForm(true);
  };

  const handleEditClick = (idx: number) => {
    setEditingIndex(idx);
    setFormData(addresses[idx]);
    setPhoneError("");
    setShowForm(true);
  };

  const handleRemoveClick = (idx: number) => {
    const updated = addresses.filter((_, i) => i !== idx);
    setAddresses(updated);
    if (selectedIndex === idx) {
      setSelectedIndex(updated.length > 0 ? 0 : null);
    }
  };

  const handleSelectAddress = (idx: number) => {
    setSelectedIndex(idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }
    setPhoneError("");

    if (editingIndex !== null) {
      const updated = [...addresses];
      updated[editingIndex] = formData;
      setAddresses(updated);
      setSelectedIndex(editingIndex);
    } else {
      const newAddresses = [...addresses, formData];
      setAddresses(newAddresses);
      setSelectedIndex(newAddresses.length - 1);
    }

    setShowForm(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setPhoneError("");
  };

  const handleContinue = () => {
    if (selectedIndex !== null) {
      setAddress(addresses[selectedIndex]);
      router.push("/payment");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader />

      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-3xl rounded-2xl shadow-lg border p-8 sm:p-12">
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-2 text-slate-900">Shipping Address</h1>
            <p className="text-sm text-slate-500">
              Select a saved address or add a new one for your eco-friendly delivery.
            </p>
          </div>

          {!showForm ? (
            <>
              {/* Address List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectAddress(idx)}
                    className={`relative flex flex-col p-5 rounded-2xl border-2 transition-all cursor-pointer min-h-[245px] ${
                      selectedIndex === idx
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    {/* Badge Container - Fixed height */}
                    <div className="h-6 mb-2">
                      {selectedIndex === idx && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          Default
                        </span>
                      )}
                    </div>

                    {/* Header with Name and Checkmark */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-slate-900 flex-1">{addr.fullName}</h3>
                      {selectedIndex === idx ? (
                        <CheckCircle size={20} className="text-emerald-500 flex-shrink-0 ml-2" />
                      ) : (
                        <Circle size={20} className="text-slate-300 flex-shrink-0 ml-2" />
                      )}
                    </div>

                    {/* Address Content - Grows to fill space */}
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {addr.street}
                        <br />
                        {addr.city}, {addr.state} {addr.pincode}
                        <br />
                        {addr.country}
                      </p>
                      <p className="text-xs text-slate-500 mt-3 truncate">{addr.phone}</p>
                    </div>

                    {/* Action Buttons - Fixed at bottom */}
                    <div className="mt-4 pt-4 border-t border-slate-200 flex gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(idx);
                        }}
                        className="text-xs font-semibold text-emerald-500 hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveClick(idx);
                        }}
                        className="text-xs font-semibold text-slate-500 hover:underline hover:text-red-500 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add New Address Card */}
                <button
                  onClick={handleAddClick}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-emerald-300 transition-all gap-3 group"
                >
                  <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:scale-110 transition-all">
                    <Plus size={24} />
                  </div>
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-emerald-500">
                    Add New Address
                  </span>
                </button>
              </div>

              {/* Footer Actions */}
              <div className="pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft size={18} />
                  Return to Cart
                </Link>
                <Button
                  onClick={handleContinue}
                  disabled={selectedIndex === null}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue to Payment
                  <ArrowRight size={18} />
                </Button>
              </div>
            </>
          ) : (
            /* Address Form */
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  {editingIndex !== null ? "Edit Address" : "Add New Address"}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Full Name
                  </label>
                  <Input
                    placeholder="Jane Doe"
                    className="rounded-xl h-11"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="jane.doe@example.com"
                    className="rounded-xl h-11"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="rounded-xl h-11"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  {phoneError && (
                    <div className="text-red-500 text-xs mt-1">{phoneError}</div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Street Address
                  </label>
                  <Input
                    placeholder="123 Eco Way, Apt 4B"
                    className="rounded-xl h-11"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    City
                  </label>
                  <Input
                    placeholder="Greenville"
                    className="rounded-xl h-11"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    ZIP / Postal Code
                  </label>
                  <Input
                    placeholder="90210"
                    className="rounded-xl h-11"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">
                    Country
                  </label>
                  <select
                    className="w-full rounded-xl h-11 px-4 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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

              {/* Form Actions */}
              <div className="pt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  {editingIndex !== null ? "Update Address" : "Add Address"}
                  <ArrowRight size={18} />
                </Button>
              </div>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}
