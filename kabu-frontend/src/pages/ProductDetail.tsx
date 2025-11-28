import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Produkt nie znaleziony</h1>
          <Button onClick={() => navigate("/")}>Wróć do strony głównej</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("Dodano do koszyka!", {
      description: product.name,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight />
                </Button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary shadow-lg scale-110"
                        : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xl font-semibold ml-2">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {product.purchaseCount} osób kupiło
                  </span>
                </div>

                <div className="text-5xl font-bold text-primary mb-8">
                  {product.price.toFixed(2)} zł
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleBuyNow}
                  className="flex-1 text-lg py-6 bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Kup teraz
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleAddToCart}
                  className="flex-1 text-lg py-6 border-2 border-primary hover:bg-primary/10"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Dodaj do koszyka
                </Button>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full" />
                  <span className="font-semibold">Dostępny w magazynie</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Wysyłka w ciągu 24h
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Opis produktu</h2>
            <div className="prose prose-lg max-w-none whitespace-pre-line">
              {product.description}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Oceny i recenzje ({product.reviews.length})
            </h2>
            <div className="grid gap-6">
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="font-semibold mb-2">{review.nickname}</div>
                  <p className="text-foreground/80 mb-2">{review.comment}</p>
                  <div className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("pl-PL")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
