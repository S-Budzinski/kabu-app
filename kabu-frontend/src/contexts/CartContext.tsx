import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;      // Suma produktów (subtotal)
  itemCount: number;
  // --- NOWE POLA ---
  promoCode: string;
  discountAmount: number;
  finalTotal: number; // Suma po rabacie
  applyPromo: (code: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  // Nowy stan dla kodu rabatowego
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(""); // Reset kodu po wyczyszczeniu koszyka
    setDiscountPercent(0);
  };

  // --- NOWA LOGIKA RABATOWA ---
  const applyPromo = (code: string) => {
    if (code.toUpperCase() === "TACLIGHT10") {
      setPromoCode("TACLIGHT10");
      setDiscountPercent(0.1); // 10%
      return true;
    } else {
      setPromoCode("");
      setDiscountPercent(0);
      return false;
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = total * discountPercent;
  const finalTotal = total - discountAmount;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        // Eksportujemy nowe wartości
        promoCode,
        discountAmount,
        finalTotal,
        applyPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};