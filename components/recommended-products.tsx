import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import SectionTitle from "./section-title"

interface RecommendedProductsProps {
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: number) => void
  favoriteIds: number[]
}

export default function RecommendedProducts({ onAddToCart, onToggleFavorite, favoriteIds }: RecommendedProductsProps) {
  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const recommendedProducts: Product[] = [
    {
      id: 1,
      name: "Leche Hacendado Semidesnatada",
      price: 0.79,
      image: "/leche.jpeg",
      quantity: 1,
      isFrequent: true,
      category: "Lácteos",
      lastPurchased: "2023-04-01",
      purchaseFrequency: "7 días",
    },
    {
      id: 2,
      name: "Pan de Molde Integral",
      price: 1.2,
      image: "/pan.jpeg",
      quantity: 1,
      isHealthy: true,
      category: "Panadería",
      lastPurchased: "2023-04-05",
      purchaseFrequency: "10 días",
    },
    {
      id: 3,
      name: "Huevos Camperos Clase M",
      price: 2.35,
      image: "/huevos.jpeg",
      quantity: 1,
      isFrequent: true,
      category: "Huevos",
      lastPurchased: "2023-04-02",
      purchaseFrequency: "14 días",
    },
    {
      id: 4,
      name: "Plátano de Canarias",
      price: 1.89,
      image: "/platano.jpeg",
      quantity: 1,
      isHealthy: true,
      isFrequent: true,
      category: "Frutas",
      lastPurchased: "2023-04-03",
      purchaseFrequency: "7 días",
    },
  ]

  return (
    <section>
      <SectionTitle
        title="Podrías volver a necesitar"
        subtitle="Basado en tus compras anteriores y frecuencia de compra"
        icon="clock"
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        {recommendedProducts.map((product) => (
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
