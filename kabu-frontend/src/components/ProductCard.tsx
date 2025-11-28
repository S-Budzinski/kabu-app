import { Link } from "react-router-dom";
import { ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

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

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/95 backdrop-blur-sm border-0">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
          {product.price.toFixed(2)} zł
        </div>
      </div>

      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem] hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            ({product.purchaseCount})
          </span>
        </div>

        <div className="flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Info className="w-4 h-4" />
              Szczegóły
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="flex-1 gap-2 bg-gradient-to-r from-secondary via-primary to-accent hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" />
            Dodaj
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
