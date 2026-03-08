"use client";


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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CheckoutHeader />

      <main className="flex-1 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 pb-28">
        <div className="w-full max-w-2xl">
          {/* Page heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Shipping Address</h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              Select a saved address or add a new one for your eco-friendly delivery.
            </p>
          </div>

          {!showForm ? (
            <>
              {/* Address grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectAddress(idx)}
                    className={`relative flex flex-col p-5 rounded-2xl border-2 transition-all duration-150 cursor-pointer min-h-55 ${
                      selectedIndex === idx
                        ? "border-emerald-500 bg-emerald-50 shadow-sm shadow-emerald-100"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    {/* Selected badge */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {selectedIndex === idx && (
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                            Selected
                          </span>
                        )}
                      </div>
                      {selectedIndex === idx ? (
                        <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                      ) : (
                        <Circle size={20} className="text-slate-300 shrink-0" />
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="font-bold text-slate-900 mb-2">{addr.fullName}</h3>

                    {/* Address content */}
                    <div className="flex-1 text-sm text-slate-500 leading-relaxed">
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.state} {addr.pincode}</p>
                      <p>{addr.country}</p>
                      <p className="mt-2 text-slate-400 text-xs">{addr.phone}</p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex gap-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditClick(idx); }}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveClick(idx); }}
                        className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add new address card */}
                <button
                  onClick={handleAddClick}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-300 hover:shadow-sm transition-all duration-150 gap-3 group min-h-55"
                >
                  <div className="w-11 h-11 rounded-full bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:scale-105 transition-all duration-150">
                    <Plus size={22} />
                  </div>
                  <span className="text-sm font-semibold text-slate-500 group-hover:text-emerald-600 transition-colors">
                    Add New Address
                  </span>
                </button>
              </div>
            </>
          ) : (
            /* Address form */
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {editingIndex !== null ? "Edit Address" : "Add New Address"}
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
                    <Input placeholder="Jane Doe" className="rounded-xl h-11" value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Email Address</label>
                    <Input type="email" placeholder="jane.doe@example.com" className="rounded-xl h-11" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Phone Number</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" className="rounded-xl h-11" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                    {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">Street Address</label>
                    <Input placeholder="123 Eco Way, Apt 4B" className="rounded-xl h-11" value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                  <div className="col-span-2 sm:col-span-2">
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">City</label>
                    <Input placeholder="Greenville" className="rounded-xl h-11" value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">State</label>
                    <Input placeholder="CA" className="rounded-xl h-11" value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1.5 block">PIN Code</label>
                    <Input placeholder="90210" className="rounded-xl h-11" value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1.5 block">Country</label>
                  <select
                    className="w-full rounded-xl h-11 px-4 border border-input bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <button type="button" onClick={handleCancel}
                    className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                    Cancel
                  </button>
                  <Button type="submit"
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 h-11 rounded-xl font-bold shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all">
                    {editingIndex !== null ? "Update Address" : "Save Address"}
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* ── Sticky footer actions ── */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-slate-200 shadow-xl z-40">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Return to Cart</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <Button
            onClick={handleContinue}
            disabled={selectedIndex === null}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none text-white px-8 h-11 rounded-xl font-bold shadow-md shadow-emerald-500/25 flex items-center gap-2 transition-all"
          >
            Continue to Payment
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
