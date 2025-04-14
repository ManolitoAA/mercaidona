"use client"

import { X, Plus, Minus, ShoppingBag, Download, ShoppingCart, Star, Leaf, Clock } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"

interface ShoppingListProps {
  products: Product[]
  onClose: () => void
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

export default function ShoppingList({ products, onClose, onUpdateQuantity, onRemove }: ShoppingListProps) {
  const totalItems = products.reduce((acc, product) => acc + product.quantity, 0)
  const totalPrice = products.reduce((acc, product) => acc + product.price * product.quantity, 0)

  const handleSavePDF = () => {
    // En una implementación real, esto generaría un PDF
    alert("Tu lista de la compra se ha guardado como PDF")
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <ShoppingBag size={48} className="text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-2">Tu lista de la compra está vacía</h3>
        <p className="text-gray-600 mb-4">Añade productos desde las recomendaciones para empezar a crear tu lista</p>
        <button onClick={onClose} className="bg-green-600 text-white px-4 py-2 rounded-md font-medium">
          Explorar productos
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="sticky top-16 z-10 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Lista de la compra</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Cerrar">
          <X size={20} />
        </button>
      </div>

      <ul className="divide-y divide-gray-100">
        {products.map((product) => (
          <li key={product.id} className="p-4 flex items-center">
            <div className="relative h-16 w-16 bg-gray-50 rounded mr-3 flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg?height=64&width=64"}
                alt={product.name}
                fill
                className="object-contain p-1"
              />

              {/* Indicadores en la esquina superior izquierda */}
              <div className="absolute top-1 left-1 flex flex-col gap-0.5">
                {product.isOnSale && <Star size={12} className="text-amber-400" fill="currentColor" />}
                {product.isHealthy && <Leaf size={12} className="text-green-500" fill="currentColor" />}
                {product.isFrequent && <Clock size={12} className="text-blue-500" />}
              </div>
            </div>

            <div className="flex-grow">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center border border-gray-200 rounded">
                  <button
                    onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
                    className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                    aria-label="Reducir cantidad"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-2 py-1 text-sm">{product.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
                    className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <span className="font-bold">{(product.price * product.quantity).toFixed(2)}€</span>
                  <div className="text-xs text-gray-500">{product.price.toFixed(2)}€/ud</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Productos:</span>
          <span>
            {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-bold">Total:</span>
          <span className="font-bold">{totalPrice.toFixed(2)}€</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md"
            onClick={() => alert("Redirigiendo a la compra online...")}
          >
            <ShoppingCart size={18} className="mr-2" />
            Continuar compra
          </button>

          <button
            className="flex items-center justify-center bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-4 rounded-md"
            onClick={handleSavePDF}
          >
            <Download size={18} className="mr-2" />
            Guardar PDF
          </button>
        </div>
      </div>
    </div>
  )
}
