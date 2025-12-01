import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import logo from '@/assets/KABU_black.png'

const Navbar = () => {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

 

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img src={logo} className="h-12 w-auto object-contain"/>
          </Link>


          {/* Cart Button - Desktop */}
          <Link to="/cart" className="hidden md:block">
            <Button className="gap-2 bg-gradient-to-r from-secondary via-primary to-accent hover:opacity-90 transition-opacity">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cart">
              <Button size="icon" variant="ghost" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
          </div>
        </div>
      </div>

      
    </nav>
  );
};

export default Navbar;
