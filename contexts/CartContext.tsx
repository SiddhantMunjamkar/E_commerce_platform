"use client";

import  { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { CartItem, CartState, CartContextType, Address } from "@/types/cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: "SET_CART_ITEMS"; payload: CartItem[] }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "SET_SHIPPING_FEE"; payload: number }
  | { type: "SET_DISCOUNT"; payload: number }
  | { type: "SET_ADDRESS"; payload: Address }
  | { type: "LOAD_FROM_STORAGE"; payload: CartState };

const calculateTotals = (cartItems: CartItem[], shippingFee: number, discount: number) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + shippingFee - discount;

  return { subtotal, total };
};

const initialState: CartState = {
  cartItems: [],
  subtotal: 0,
  shippingFee: 0,
  discount: 0,
  total: 0,
  address: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "LOAD_FROM_STORAGE": {
      return action.payload;
    }

    case "SET_CART_ITEMS": {
      const { subtotal, total } = calculateTotals(action.payload, state.shippingFee, state.discount);
      return { ...state, cartItems: action.payload, subtotal, total };
    }

    case "INCREASE_QUANTITY": {
      const updatedItems = state.cartItems.map((item) =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      const { subtotal, total } = calculateTotals(updatedItems, state.shippingFee, state.discount);
      return { ...state, cartItems: updatedItems, subtotal, total };
    }

    case "DECREASE_QUANTITY": {
      const updatedItems = state.cartItems.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const { subtotal, total } = calculateTotals(updatedItems, state.shippingFee, state.discount);
      return { ...state, cartItems: updatedItems, subtotal, total };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.cartItems.filter((item) => item.id !== action.payload);
      const { subtotal, total } = calculateTotals(updatedItems, state.shippingFee, state.discount);
      return { ...state, cartItems: updatedItems, subtotal, total };
    }

    case "SET_SHIPPING_FEE": {
      const { subtotal, total } = calculateTotals(state.cartItems, action.payload, state.discount);
      return { ...state, shippingFee: action.payload, subtotal, total };
    }

    case "SET_DISCOUNT": {
      const { subtotal, total } = calculateTotals(state.cartItems, state.shippingFee, action.payload);
      return { ...state, discount: action.payload, subtotal, total };
    }

    case "SET_ADDRESS": {
      return { ...state, address: action.payload };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cartState");
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch({ type: "LOAD_FROM_STORAGE", payload: parsed });
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart data to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cartState", JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [state]);

  const increaseQuantity = (product_id: number) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: product_id });
  };

  const decreaseQuantity = (product_id: number) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: product_id });
  };

  const removeItem = (product_id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: product_id });
  };

  const setShippingFee = (fee: number) => {
    dispatch({ type: "SET_SHIPPING_FEE", payload: fee });
  };

  const setDiscount = (discount: number) => {
    dispatch({ type: "SET_DISCOUNT", payload: discount });
  };

  const loadCartFromAPI = (items: CartItem[]) => {
    const formattedItems: CartItem[] = items.map((item) => ({
      id: item.id,
      name: item.name,
      desc: item.desc,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image,
    }));
    dispatch({ type: "SET_CART_ITEMS", payload: formattedItems });
  };

  const setAddress = (address: Address) => {
    dispatch({ type: "SET_ADDRESS", payload: address });
  };

  const value: CartContextType = {
    ...state,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    setShippingFee,
    setDiscount,
    loadCartFromAPI,
    setAddress,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
