import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    total,          // To jest subtotal
    discountAmount, // To jest kwota rabatu
    finalTotal,     // To jest kwota końcowa
    applyPromo,
    promoCode: activeCode // Kod zapisany w kontekście
  } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [inputCode, setInputCode] = useState("");

  const handleApplyPromo = () => {
    const success = applyPromo(inputCode);
    if (success) {
      toast.success("Kod rabatowy zastosowany!", {
        description: "10% zniżki",
      });
    } else {
      toast.error("Nieprawidłowy kod rabatowy");
    }
  };


  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Twój koszyk jest pusty</h1>
            <p className="text-muted-foreground mb-8">
              Dodaj produkty, aby kontynuować zakupy
            </p>
            <Button onClick={() => navigate("/")}>Przejdź do sklepu</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Koszyk</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg flex gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-lg bg-muted"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {item.price.toFixed(2)} zł
                    </p>

                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-semibold w-12 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Podsumowanie</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Kod rabatowy"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                    />
                    <Button onClick={handleApplyPromo} variant="outline">
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Sprawdzamy czy discountAmount > 0 zamiast lokalnego stanu */}
                  {discountAmount > 0 && (
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm">
                      Rabat 10% zastosowany! ({activeCode})
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span>Suma częściowa:</span>
                    <span className="font-semibold">
                      {total.toFixed(2)} zł
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Rabat:</span>
                      <span className="font-semibold">
                        -{discountAmount.toFixed(2)} zł
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold">
                    <span>Suma:</span>
                    <span className="text-primary">
                      {finalTotal.toFixed(2)} zł
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full text-lg py-6 bg-gradient-to-r from-secondary via-primary to-accent hover:opacity-90"
                  onClick={() => navigate("/checkout")}
                >
                  Przejdź do kasy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
