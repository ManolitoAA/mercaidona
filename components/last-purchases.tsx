import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import SectionTitle from "./section-title"

interface LastPurchasesProps {
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: number) => void
  favoriteIds: number[]
}

export default function LastPurchases({ onAddToCart, onToggleFavorite, favoriteIds }: LastPurchasesProps) {
  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const lastPurchases: Product[] = [
    {
      id: 13,
      name: "Pollo Entero",
      price: 4.95,
      image: "/pollo.jpeg",
      quantity: 1,
      category: "Carnicería",
      lastPurchased: "2023-04-10",
    },
    {
      id: 14,
      name: "Manzanas Golden 1kg",
      price: 1.99,
      image: "/manzanas.jpeg",
      quantity: 1,
      isHealthy: true,
      category: "Frutas",
      lastPurchased: "2023-04-10",
    },
    {
      id: 15,
      name: "Pasta Espagueti 500g",
      price: 0.89,
      image: "/pasta.jpeg",
      quantity: 1,
      category: "Pasta",
      lastPurchased: "2023-04-10",
    },
    {
      id: 16,
      name: "Tomates 1kg",
      price: 2.15,
      image: "/tomates.jpeg",
      quantity: 1,
      isHealthy: true,
      category: "Verduras",
      lastPurchased: "2023-04-10",
    },
  ]

  return (
    <section>
      <SectionTitle
        title="Tus últimas compras"
        subtitle="Productos de tu última visita a Mercadona"
        icon="shopping-bag"
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        {lastPurchases.map((product) => (
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
