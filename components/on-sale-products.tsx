import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import SectionTitle from "./section-title"

interface OnSaleProductsProps {
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: number) => void
  favoriteIds: number[]
}

export default function OnSaleProducts({ onAddToCart, onToggleFavorite, favoriteIds }: OnSaleProductsProps) {
  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const onSaleProducts: Product[] = [
    {
      id: 5,
      name: "Aceite de Oliva Virgen Extra 1L",
      price: 4.5,
      oldPrice: 5.95,
      image: "/Aceite.jpg",
      quantity: 1,
      isOnSale: true,
      isFrequent: true,
      category: "Aceites",
      lastPurchased: "2023-03-15",
    },
    {
      id: 6,
      name: "Detergente Lavadora Concentrado",
      price: 3.25,
      oldPrice: 4.5,
      image: "/detergente.jpeg",
      quantity: 1,
      isOnSale: true,
      category: "Limpieza",
      lastPurchased: "2023-03-10",
    },
    {
      id: 7,
      name: "Yogur Natural Pack-8",
      price: 1.6,
      oldPrice: 1.95,
      image: "/yogur.jpeg",
      quantity: 1,
      isOnSale: true,
      isHealthy: true,
      category: "Lácteos",
      lastPurchased: "2023-03-20",
    },
    {
      id: 8,
      name: "Papel Higiénico Doble Capa 12 rollos",
      price: 2.75,
      oldPrice: 3.5,
      image: "/papel.jpeg",
      quantity: 1,
      isOnSale: true,
      category: "Hogar",
      lastPurchased: "2023-03-05",
    },
  ]

  return (
    <section>
      <SectionTitle
        title="Tus habituales en oferta"
        subtitle="Productos que compras frecuentemente ahora con descuento"
        icon="star"
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        {onSaleProducts.map((product) => (
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
