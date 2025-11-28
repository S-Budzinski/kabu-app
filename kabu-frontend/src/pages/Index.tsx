import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20 pb-16 relative">
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, 
                hsl(195, 100%, 65% / 0.3) 0%, 
                hsl(190, 100%, 75% / 0.25) 30%,
                hsl(185, 100%, 85% / 0.15) 60%,
                hsl(0, 0%, 100% / 0) 100%
              ),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")
            `,
            filter: 'blur(80px)',
            zIndex: -1
          }}
        />
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <HeroCarousel />
        </section>

        {/* Products Section */}
        <section id="products" className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">Nasze Produkty</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Odkryj profesjonalne latarki taktyczne i akcesoria najwyższej jakości
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 animate-fade-in">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white/10 backdrop-blur-md mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-foreground/70">
          <p>&copy; 2025 TacLight. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
