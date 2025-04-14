import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import SectionTitle from "./section-title"

interface PersonalizedOffersProps {
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: number) => void
  favoriteIds: number[]
}

export default function PersonalizedOffers({ onAddToCart, onToggleFavorite, favoriteIds }: PersonalizedOffersProps) {
  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const personalizedOffers: Product[] = [
    {
      id: 9,
      name: "Quinoa Ecológica 500g",
      price: 2.95,
      oldPrice: 3.5,
      image: "/quinoa.jpeg",
      quantity: 1,
      isOnSale: true,
      isHealthy: true,
      category: "Cereales",
      lastPurchased: null,
    },
    {
      id: 10,
      name: "Tofu Firme 400g",
      price: 1.75,
      oldPrice: 2.25,
      image: "/tofu.jpeg",
      quantity: 1,
      isOnSale: true,
      isHealthy: true,
      category: "Vegetarianos",
      lastPurchased: null,
    },
    {
      id: 11,
      name: "Café en Grano Natural 500g",
      price: 3.45,
      oldPrice: 4.2,
      image: "/cafe.jpeg",
      quantity: 1,
      isOnSale: true,
      category: "Cafés",
      lastPurchased: null,
    },
    {
      id: 12,
      name: "Vino Tinto Crianza D.O. Rioja",
      price: 4.95,
      oldPrice: 6.5,
      image: "/vino.jpeg",
      quantity: 1,
      isOnSale: true,
      category: "Vinos",
      lastPurchased: null,
    },
  ]

  return (
    <section>
      <SectionTitle
        title="También te puede interesar"
        subtitle="Ofertas personalizadas según tus preferencias"
        icon="sparkles"
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        {personalizedOffers.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoriteIds.includes(product.id)}
          />
        ))}
      </div>
    </section>
  )
}
