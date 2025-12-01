import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { CreditCard, Truck, CheckCircle } from "lucide-react";

const Checkout = () => {
  const { items, total, finalTotal, promoCode, clearCart, discountAmount, shippingCost} = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (Object.values(formData).some((value) => !value)) {
      toast.error("Wypełnij wszystkie pola");
      return;
    }

    if (!items || items.length === 0) {
      toast.error("Koszyk jest pusty");
      return;
    }

    setLoading(true);

    try {
      // Send cart to backend to create Checkout Session
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4242';
      const response = await fetch(`${apiUrl}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: items.map(it => ({ id: it.id, name: it.name, price: it.price, quantity: it.quantity, image: it.image })),
          customer: formData,
          promoCode: promoCode,
          successUrl: (window.location.origin + '/checkout-success?session_id={CHECKOUT_SESSION_ID}'),
          cancelUrl: (window.location.origin + '/cart')
        })
      });

      const data = await response.json();
      if (data.url) {
        // Redirect to Stripe-hosted Checkout
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Błąd podczas tworzenia sesji');
      }
    } catch (err: any) {
      console.error(err);
      toast.error('Nie udało się rozpocząć płatności: ' + (err.message || err));
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient">Kasa</span>
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Dane do wysyłki</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Imię</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nazwisko</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Adres</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Miasto</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Kod pocztowy</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Płatność</h2>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    Po kliknięciu „Zapłać” zostaniesz przekierowany do bezpiecznej strony płatności.
                    Możesz wybrać kartę, BLIK lub Przelewy24.
                  </p>

                  <Button
                    type="submit"
                    className="w-full text-lg py-6 bg-gradient-to-r from-secondary via-primary to-accent hover:opacity-90"
                    disabled={loading}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Zapłać {finalTotal.toFixed(2)} zł
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Twoje zamówienie</h2>

                <div className="space-y-4 mb-6 pb-6 border-b">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded bg-muted"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm line-clamp-1">
                          {item.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} x {item.price.toFixed(2)} zł
                        </div>
                      </div>
                      <div className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)} zł
                      </div>
                    </div>
                  ))}
                </div>

                {/* TWÓJ URYWEK KODU (Zaktualizowany o zmienne) */}
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Suma produktów:</span>
                    <span>{total.toFixed(2)} zł</span>
                  </div>
                  
                  {/* Wyświetlanie rabatu jeśli istnieje */}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-lg text-green-600">
                      <span>Rabat ({promoCode}):</span>
                      <span>-{discountAmount.toFixed(2)} zł</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg items-center">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Dostawa:
                    </span>
                    <span>{shippingCost.toFixed(2)} zł</span>
                  </div>

                  <div className="flex justify-between text-xl font-bold pt-3 border-t">
                    <span>Suma:</span>
                    <span className="text-primary">{finalTotal.toFixed(2)} zł</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
