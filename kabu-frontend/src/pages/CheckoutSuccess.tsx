import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // Opcjonalne, ale dodaje ładną animację wejścia, jeśli nie masz framer-motion, usuń ten import i wrapper motion.div

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();

  // Wyczyść koszyk zaraz po załadowaniu strony sukcesu
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-16 container mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
          
          {/* Ikona sukcesu */}
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-6 shadow-lg shadow-green-100/50">
              <CheckCircle className="w-24 h-24 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Dziękujemy!
            </h1>
            <h2 className="text-2xl font-semibold text-foreground/80">
              Płatność zakończona sukcesem
            </h2>
            <p className="text-muted-foreground text-lg">
              Twoje zamówienie zostało przyjęte do realizacji. Na Twój adres email wysłaliśmy potwierdzenie.
            </p>
            
            {sessionId && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg border text-sm text-muted-foreground break-all">
                ID Sesji: {sessionId}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="gap-2 text-lg px-8 py-6"
              onClick={() => navigate("/")}
            >
              Wróć do sklepu <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutSuccess;