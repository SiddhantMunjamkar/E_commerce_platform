export interface CartItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CartState {
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  address: Address | null;
}

export interface CartContextType extends CartState {
  increaseQuantity: (product_id: number) => void;
  decreaseQuantity: (product_id: number) => void;
  removeItem: (product_id: number) => void;
  setShippingFee: (fee: number) => void;
  setDiscount: (discount: number) => void;
  loadCartFromAPI: (items: CartItem[]) => void;
  setAddress: (address: Address) => void;
}
