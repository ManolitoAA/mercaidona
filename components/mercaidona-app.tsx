"use client"

import { useState, useRef } from "react"
import { ShoppingCart, MessageCircle } from "lucide-react"
import Header from "./header"
import RecommendedProducts from "./recommended-products"
import OnSaleProducts from "./on-sale-products"
import PersonalizedOffers from "./personalized-offers"
import LastPurchases from "./last-purchases"
import ExpenseSummary from "./expense-summary"
import ShoppingList from "./shopping-list"
import PurchaseHistory from "./purchase-history"
import ChatbotModal from "./chatbot-modal"
import type { Product } from "@/types/product"
import { useMobile } from "@/hooks/use-mobile"

export default function MercAIdonaApp() {
  const isMobile = useMobile()
  const [shoppingList, setShoppingList] = useState<Product[]>([])
  const [showShoppingList, setShowShoppingList] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([])

  // Referencia para el historial de compras
  const historyRef = useRef<HTMLDivElement>(null)

  const addToShoppingList = (product: Product) => {
    const exists = shoppingList.find((item) => item.id === product.id)
    if (exists) {
      setShoppingList(
        shoppingList.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)),
      )
    } else {
      setShoppingList([...shoppingList, { ...product, quantity: 1 }])
    }
  }

  const removeFromShoppingList = (productId: number) => {
    setShoppingList(shoppingList.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromShoppingList(productId)
      return
    }

    setShoppingList(shoppingList.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const toggleFavorite = (productId: number) => {
    if (favoriteProducts.includes(productId)) {
      setFavoriteProducts(favoriteProducts.filter((id) => id !== productId))
    } else {
      setFavoriteProducts([...favoriteProducts, productId])
    }
  }

  const scrollToHistory = () => {
    if (historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto pb-20">
      <Header />

      <div className="relative px-4">
        {showShoppingList ? (
          <ShoppingList
            products={shoppingList}
            onClose={() => setShowShoppingList(false)}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromShoppingList}
          />
        ) : (
          <div className="space-y-6 pb-16">
            <RecommendedProducts
              onAddToCart={addToShoppingList}
              onToggleFavorite={toggleFavorite}
              favoriteIds={favoriteProducts}
            />
            <OnSaleProducts
              onAddToCart={addToShoppingList}
              onToggleFavorite={toggleFavorite}
              favoriteIds={favoriteProducts}
            />
            <PersonalizedOffers
              onAddToCart={addToShoppingList}
              onToggleFavorite={toggleFavorite}
              favoriteIds={favoriteProducts}
            />
            <LastPurchases
              onAddToCart={addToShoppingList}
              onToggleFavorite={toggleFavorite}
              favoriteIds={favoriteProducts}
            />
            <ExpenseSummary />
            <div ref={historyRef}>
              <PurchaseHistory />
            </div>
          </div>
        )}

        <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-3">
          <button
            onClick={() => setShowChatbot(true)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
            aria-label="Abrir asistente de compra"
          >
            <MessageCircle size={24} />
          </button>

          <button
            onClick={() => setShowShoppingList(!showShoppingList)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center relative"
            aria-label={showShoppingList ? "Cerrar lista de la compra" : "Ver lista de la compra"}
          >
            <ShoppingCart size={24} />
            {shoppingList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {shoppingList.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {showChatbot && <ChatbotModal onClose={() => setShowChatbot(false)} scrollToHistory={scrollToHistory} />}
    </div>
  )
}
