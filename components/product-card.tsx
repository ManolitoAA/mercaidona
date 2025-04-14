"use client"

import { Star, Leaf, Clock } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"
import { useState } from "react"
import ChatbotModal from "./chatbot-modal"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onToggleFavorite: (productId: number) => void
  isFavorite?: boolean
}

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite = false }: ProductCardProps) {
  const [showChatbot, setShowChatbot] = useState(false)
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0

  // Formatear la fecha de última compra
  const formatLastPurchased = (dateString: string) => {
    if (!dateString) return "No comprado anteriormente"
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
  }

  // Calcular la frecuencia de compra (simulada)
  const getFrequency = () => {
    if (product.purchaseFrequency) {
      return `Compra cada ${product.purchaseFrequency}`
    } else if (product.isFrequent) {
      return "Compra frecuente (cada 7-14 días)"
    } else if (product.lastPurchased) {
      return "Compra ocasional"
    }
    return "Nuevo para ti"
  }

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative h-32 bg-gray-50">
        <Image
          src={product.image || "/placeholder.svg?height=128&width=128"}
          alt={product.name}
          fill
          className="object-contain p-2"
        />

        {/* Indicadores en la esquina superior izquierda */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isOnSale && <Star size={16} className="text-amber-400" fill="currentColor" />}
          {product.isHealthy && <Leaf size={16} className="text-green-500" fill="currentColor" />}
          {product.isFrequent && <Clock size={16} className="text-blue-500" />}
        </div>
      </div>

      <div className="p-3 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
          <div className="flex flex-col items-end ml-1">
            {product.isOnSale && product.oldPrice && (
              <span className="text-xs text-gray-500 line-through">{product.oldPrice.toFixed(2)}€</span>
            )}
            <span className={`font-bold ${product.isOnSale ? "text-red-600" : "text-gray-900"}`}>
              {product.price.toFixed(2)}€
            </span>
          </div>
        </div>

        {/* Información de última compra y frecuencia */}
        {product.lastPurchased && (
          <div className="mt-1 mb-1">
            <p className="text-xs text-gray-500">Última compra: {formatLastPurchased(product.lastPurchased)}</p>
            <p className="text-xs text-gray-500">{getFrequency()}</p>
          </div>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <button
            onClick={() => onToggleFavorite(product.id)}
            className={`${isFavorite ? "text-amber-400" : "text-gray-400"} hover:text-amber-400`}
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
          >
            <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1 px-2 rounded"
          >
            Añadir
          </button>
        </div>
      </div>

      {showChatbot && <ChatbotModal product={product} onClose={() => setShowChatbot(false)} />}
    </div>
  )
}
