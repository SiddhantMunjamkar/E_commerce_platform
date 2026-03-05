# Quick Start Guide - CartContext Implementation

## 🚀 Getting Started

### Installation & Setup
```bash
# Install dependencies (if not already done)
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in browser
```

## 📋 How It Works

### 1. CartContext is automatically provided
- The root layout wraps your app with `<CartProvider>`
- All pages can access cart data via `useCart()` hook
- No manual provider setup needed per page

### 2. Load cart data on page load
```tsx
"use client";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

export default function CartPage() {
  const { loadCartFromAPI, setShippingFee, setDiscount } = useCart();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();
      
      loadCartFromAPI(data.cartItems);
      setShippingFee(data.shippingFee);
      setDiscount(data.discount);
    };
    
    fetchCart();
  }, [loadCartFromAPI, setShippingFee, setDiscount]);
}
```

### 3. Use cart data in components
```tsx
"use client";
import { useCart } from "@/contexts/CartContext";

export default function OrderSummary() {
  const { cartItems, subtotal, shippingFee, discount, total } = useCart();

  return (
    <div>
      <p>Items: {cartItems.length}</p>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Shipping: ${shippingFee.toFixed(2)}</p>
      {discount > 0 && <p>Discount: -${discount.toFixed(2)}</p>}
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```

### 4. Modify quantities
```tsx
"use client";
import { useCart } from "@/contexts/CartContext";

export default function CartItem() {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  return (
    <div>
      <button onClick={() => decreaseQuantity(itemId)}>-</button>
      <span>Qty: {quantity}</span>
      <button onClick={() => increaseQuantity(itemId)}>+</button>
      <button onClick={() => removeItem(itemId)}>Remove</button>
    </div>
  );
}
```

## 📁 Project Structure After Implementation

```
my-app/
├── app/
│   ├── layout.tsx              ← CartProvider wraps app
│   ├── page.tsx                ← Cart page (client component)
│   ├── api/
│   │   └── cart/
│   │       └── route.ts        ← API with cart data
│   ├── checkout/
│   │   └── page.tsx            ← Shipping address
│   ├── payment/
│   │   └── page.tsx            ← Payment & order review
│   └── success/
│       └── page.tsx            ← Order confirmation
│
├── contexts/
│   └── CartContext.tsx         ← NEW: Cart state management
│
├── types/
│   └── cart.ts                 ← Updated: Interfaces
│
├── components/
│   └── checkout-header.tsx     ← Progress indicator
│
└── Documentation:
    ├── CART_CONTEXT_GUIDE.md   ← Full guide
    ├── IMPLEMENTATION_SUMMARY.md ← Summary
    └── CHECKLIST.md            ← Verification
```

## 🔄 Typical Workflow

### User adds/modifies items:
1. User clicks +/- on cart page
2. `increaseQuantity()` or `decreaseQuantity()` called
3. CartContext reducer updates state
4. `calculateTotals()` runs automatically
5. Component re-renders with new totals
6. No manual calculation needed - it's automatic!

### User proceeds to checkout:
1. Clicks "Proceed to Checkout"
2. Navigates to `/checkout`
3. CartContext still holds all data
4. User can still see cart summary if needed

### User reviews payment:
1. Clicks "Continue to Payment"
2. Navigates to `/payment`
3. CartContext data is still there
4. Page displays final order from context
5. No need to re-fetch or recalculate

### Order confirmed:
1. User completes payment
2. Navigates to `/success`
3. Final order summary from CartContext
4. All totals already calculated

## 🎯 Key Points

### ✅ What's Automatic
- Subtotal calculation
- Total calculation (subtotal + shipping - discount)
- Quantity constraints (min 1)
- Real-time updates

### ✅ What You Control
- When to fetch cart data
- When to update shipping fee
- When to apply discount
- Navigation flow

### ✅ What's Type-Safe
- CartItem interface
- CartState interface
- All function parameters and returns
- No `any` types

## 🐛 Debugging Tips

### View current cart state:
```tsx
const { cartItems, subtotal, shippingFee, discount, total } = useCart();
console.log({ cartItems, subtotal, shippingFee, discount, total });
```

### Check if CartContext is available:
```tsx
const cart = useCart(); // Will throw error if outside CartProvider
```

### Verify calculations:
```tsx
const { subtotal, shippingFee, discount, total } = useCart();
console.log(`Calculation: ${subtotal} + ${shippingFee} - ${discount} = ${total}`);
```

## 📝 Common Tasks

### Add a new cart action:
1. Add type to `CartAction` in CartContext
2. Add case in `cartReducer`
3. Add function to provider value
4. Export from useCart hook

### Change calculation logic:
1. Edit `calculateTotals()` function
2. It's called automatically whenever state changes
3. All components get new values immediately

### Fetch cart data from different API:
```tsx
const { loadCartFromAPI } = useCart();

// Replace "/api/cart" with your endpoint
const res = await fetch("/your-custom-endpoint");
const data = await res.json();
loadCartFromAPI(data.cartItems);
```

## 🎓 Interview Talking Points

This implementation shows:
1. **React Context API** - Global state without Redux
2. **useReducer Hook** - Predictable state management
3. **TypeScript** - Type safety throughout
4. **Custom Hooks** - Reusable logic (useCart)
5. **E-commerce Logic** - Real product calculations
6. **Client/Server Components** - NextJS 13+ patterns
7. **Separation of Concerns** - Context ≠ Components

## 📚 Additional Resources

- `/CART_CONTEXT_GUIDE.md` - Comprehensive guide
- `/IMPLEMENTATION_SUMMARY.md` - What was changed
- `/CHECKLIST.md` - Verification checklist
- Code comments in `CartContext.tsx` - Inline documentation

---

**Ready to use!** 🎉 All pages automatically have access to cart state via `useCart()`. Start testing the flow from Cart → Checkout → Payment → Success!
