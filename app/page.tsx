import { Header, Sidebar, Footer } from "@/components/layout"
import { HeroSection, CategoriesSection } from "@/components/home-sections"
import { CartProvider } from "@/lib/cart-context"

export default function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 lg:ml-48">
            <HeroSection />
            <CategoriesSection />
          </main>
        </div>
        <Footer />
      </div>
    </CartProvider>
  )
}
