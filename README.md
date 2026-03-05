# Eco-Friendly Checkout App

A modern, fully-functional e-commerce checkout system built with **Next.js 16**, **React**, and **TypeScript**. This project demonstrates best practices in state management using **React Context API** with `useReducer`, responsive UI design, and seamless checkout flow.

## ✨ Features

### 🛒 Shopping Cart
- Add/remove items from cart
- Increase/decrease quantity with constraints (minimum 1)
- Real-time subtotal calculation
- Persistent cart state across pages

### 📦 Checkout Process
- **Multi-step checkout flow**: Cart → Address → Payment → Success
- **Shipping Address Form** with full address capture:
  - Full Name, Email, Phone
  - Street Address
  - City, State/Province
  - ZIP/Postal Code
  - Country dropdown
- **Payment Summary** with order review
- **Order Confirmation** with receipt

### 💰 Order Summary
- Real-time subtotal calculation
- Dynamic shipping fee updates
- Discount application
- Total calculation: `subtotal + shipping - discount`

### 🎨 UI/UX
- Responsive design (mobile-first)
- Progress indicator showing current checkout step
- Rounded-corner inputs with proper styling
- Emerald green theme for primary actions
- Smooth navigation between pages

### 📱 Mobile Optimized
- Fully responsive layout
- Touch-friendly buttons and inputs
- Grid system adapts to screen size

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 16.1.6 with Turbopack
- **Language**: TypeScript
- **State Management**: React Context API + useReducer
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Components**: shadcn/ui (Button, Card, Input)

### Project Structure
```
my-app/
├── app/
│   ├── api/
│   │   └── cart/
│   │       └── route.ts          # API endpoint for cart data
│   ├── checkout/
│   │   └── page.tsx              # Shipping address form
│   ├── payment/
│   │   └── page.tsx              # Payment & order review
│   ├── success/
│   │   └── page.tsx              # Order confirmation
│   ├── page.tsx                  # Cart page (home)
│   ├── layout.tsx                # Root layout with CartProvider
│   └── globals.css               # Global styles
├── components/
│   ├── checkout-header.tsx       # Progress indicator
│   └── ui/                       # shadcn/ui components
├── contexts/
│   └── CartContext.tsx           # Global cart state management
├── types/
│   └── cart.ts                   # TypeScript interfaces
├── public/                       # Static assets
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🔄 State Management: CartContext

### CartState Structure
```typescript
interface CartState {
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  address: Address | null;
}
```

### Available Actions
- `increaseQuantity(product_id)` - Increase item quantity
- `decreaseQuantity(product_id)` - Decrease item quantity (min: 1)
- `removeItem(product_id)` - Remove item from cart
- `setShippingFee(fee)` - Update shipping fee
- `setDiscount(discount)` - Apply discount
- `loadCartFromAPI(items)` - Load cart items from API
- `setAddress(address)` - Save shipping address

### Automatic Calculations
**Subtotal:**
```
subtotal = Σ(product_price × quantity)
```

**Total:**
```
total = subtotal + shippingFee - discount
```

Recalculates automatically whenever cart state changes.

## 📄 Page Details

### 1. **Cart Page** (`/app/page.tsx`)
- Displays all items in cart
- Shows item image, name, price, description
- Quantity controls: +/- buttons
- Item removal: Trash icon
- Order summary sidebar
- Link to checkout page

### 2. **Checkout Page** (`/app/checkout/page.tsx`)
- Shipping address form with all required fields
- Smooth, rounded input styling
- Form validation (required fields)
- Prefills address if already saved
- Navigation: Back to Cart / Continue to Payment

### 3. **Payment Page** (`/app/payment/page.tsx`)
- Left: Order summary with all items
- Right: Shipping details (editable)
- Payment card with:
  - Subtotal, shipping, discount, total
  - "Pay Securely" button with Lock icon
  - Security badge
- Navigate to success on payment

### 4. **Success Page** (`/app/success/page.tsx`)
- Order confirmation message
- Displays final order summary
- Shows shipping address
- Links to continue shopping or view receipt

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone or open project
cd "d:\Codes\New folder\my-app"

# Install dependencies
npm install

# Run development server
npm run dev
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 🔌 API Integration

### Cart API Endpoint
**GET** `/api/cart`

**Response:**
```json
{
  "cartItems": [
    {
      "id": 1,
      "name": "Eco-Friendly Bottle",
      "desc": "Sustainable water bottle",
      "price": 29.99,
      "quantity": 2,
      "image": "https://via.placeholder.com/150"
    }
  ],
  "shippingFee": 20,
  "discount": 0
}
```

## 🎯 How to Use

### 1. **View Cart**
- Navigate to home page
- See all items with quantities
- Use +/- to adjust quantities
- Remove items with trash icon

### 2. **Checkout**
- Click "Continue to Checkout"
- Enter shipping address
- Click "Continue to Payment"

### 3. **Review & Pay**
- Review final order
- Edit shipping if needed
- Click "Pay Securely"

### 4. **Confirmation**
- Order confirmation page shows
- Display final receipt
- Option to continue shopping

## 📊 Checkout Flow Diagram

```
┌──────────────────────────┐
│   Cart Page (/)          │
│  • View items            │
│  • Adjust quantities     │
│  • See order summary     │
└────────────┬─────────────┘
             │
             ↓
┌──────────────────────────┐
│   Checkout (/checkout)   │
│  • Enter address         │
│  • Save shipping info    │
│  • Cart data persists    │
└────────────┬─────────────┘
             │
             ↓
┌──────────────────────────┐
│   Payment (/payment)     │
│  • Review order          │
│  • See final totals      │
│  • Process payment       │
└────────────┬─────────────┘
             │
             ↓
┌──────────────────────────┐
│   Success (/success)     │
│  • Order confirmation    │
│  • Show receipt          │
│  • Download option       │
└──────────────────────────┘
```

## 🔐 Security Features

- Form validation on all fields
- Secure payment indicator
- Encryption badge display
- Type-safe TypeScript implementation
- No sensitive data in localStorage

## 🎨 Design Details

### Color Scheme
- **Primary**: Emerald Green (`#10b981`)
- **Hover**: Emerald Dark (`#059669`)
- **Background**: Light Gray (`#f6f8f7`)
- **Text**: Slate Gray for labels

### Typography
- **Headings**: Bold, larger font sizes
- **Labels**: Small, medium weight
- **Input Text**: Regular weight

### Components
- **Inputs**: Rounded corners (`rounded-xl`), height 44px
- **Buttons**: Emerald background, hover effect
- **Cards**: Subtle shadow, border styling
- **Progress**: Green ring for current, checkmark for completed

## 📱 Responsive Breakpoints

- **Mobile**: Default (max 640px)
- **Tablet**: sm: 640px - md: 768px
- **Desktop**: lg: 1024px and up

Grid layouts adjust automatically:
- Single column on mobile
- Two columns on desktop

## 🧪 Testing

### Manual Test Cases
1. ✅ Add items to cart
2. ✅ Increase/decrease quantities
3. ✅ Remove items
4. ✅ Verify subtotal updates
5. ✅ Navigate to checkout
6. ✅ Fill shipping form
7. ✅ Proceed to payment
8. ✅ Verify final totals
9. ✅ Complete payment flow
10. ✅ View order confirmation

## 🔧 Configuration

### Environment Variables
Create `.env.local` if needed:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Next.js Config (`next.config.ts`)
- Image optimization enabled
- Turbopack for faster builds
- Image domains configured:
  - `via.placeholder.com`
  - `lh3.googleusercontent.com`

## 📚 Code Examples

### Using CartContext Hook
```tsx
"use client";

import { useCart } from "@/contexts/CartContext";

export function MyComponent() {
  const {
    cartItems,
    subtotal,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeItem
  } = useCart();

  return (
    <div>
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Qty: {item.quantity}</p>
          <button onClick={() => increaseQuantity(item.id)}>+</button>
          <button onClick={() => decreaseQuantity(item.id)}>-</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}
```

### Accessing Address
```tsx
const { address, setAddress } = useCart();

// Use address data
if (address) {
  console.log(address.fullName, address.email);
}

// Update address
setAddress({
  fullName: "Jane Doe",
  email: "jane@example.com",
  phone: "+1 (555) 000-0000",
  street: "123 Main St",
  city: "New York",
  state: "NY",
  pincode: "10001",
  country: "United States"
});
```

## 💡 Key Concepts Demonstrated

### React Context API
- Global state management without Redux
- useContext + useReducer pattern
- Custom hooks for cleaner component code

### Next.js Features
- App Router with dynamic routes
- API routes for backend endpoints
- Image optimization
- TypeScript support

### TypeScript
- Interface definitions
- Type-safe state management
- No implicit `any` types

### State Management
- Predictable state updates with useReducer
- Automatic recalculation of derived values
- Immutable state updates

### Form Handling
- Controlled components
- Form validation
- State persistence across pages

## 🚨 Common Issues & Solutions

### Issue: Cart data not persisting
**Solution**: Ensure CartProvider wraps entire app in layout.tsx

### Issue: Image not loading
**Solution**: Add domain to next.config.ts images.domains array

### Issue: Type errors on cart operations
**Solution**: Import interfaces from types/cart.ts

### Issue: Calculations not updating
**Solution**: Reducer automatically recalculates on state change; check that you're calling the correct action

## 📝 Performance Notes

- Uses useRef to prevent unnecessary API calls
- Automatic total recalculation only on relevant changes
- Image optimization via Next.js
- Efficient re-renders with proper dependency arrays

## 🎓 Interview Talking Points

This project demonstrates:
- ✅ React Context API mastery
- ✅ useReducer pattern for complex state
- ✅ TypeScript proficiency
- ✅ E-commerce logic understanding
- ✅ Next.js expertise
- ✅ Responsive design skills
- ✅ Clean code principles
- ✅ Proper separation of concerns
- ✅ Real-world application architecture
- ✅ Form handling and validation

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project for learning purposes.

---

**Last Updated**: March 5, 2026  
**Version**: 1.0  
**Status**: Production Ready ✅
# E_commerce_platform
