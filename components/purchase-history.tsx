"use client"

import { useState } from "react"
import { MapPin, Calendar, ShoppingBag, X } from "lucide-react"
import SectionTitle from "./section-title"

interface TicketItem {
  id: number
  name: string
  quantity: number
  price: number
  total: number
}

interface PurchaseRecord {
  id: number
  date: string
  location: string
  type: "online" | "store"
  total: number
  items: number
  ticketItems: TicketItem[]
}

export default function PurchaseHistory() {
  const [selectedPurchase, setSelectedPurchase] = useState<PurchaseRecord | null>(null)

  // Datos de ejemplo - en una aplicación real, estos vendrían de una API
  const purchaseHistory: PurchaseRecord[] = [
    {
      id: 1,
      date: "2023-04-10",
      location: "Mercadona Avenida Madrid",
      type: "store",
      total: 45.67,
      items: 12,
      ticketItems: [
        { id: 101, name: "Leche Hacendado Semidesnatada", quantity: 2, price: 0.79, total: 1.58 },
        { id: 102, name: "Pan de Molde Integral", quantity: 1, price: 1.2, total: 1.2 },
        { id: 103, name: "Huevos Camperos Clase M", quantity: 1, price: 2.35, total: 2.35 },
        { id: 104, name: "Plátano de Canarias 1kg", quantity: 1, price: 1.89, total: 1.89 },
        { id: 105, name: "Pollo Entero", quantity: 1, price: 4.95, total: 4.95 },
        { id: 106, name: "Aceite de Oliva Virgen Extra 1L", quantity: 1, price: 4.5, total: 4.5 },
        { id: 107, name: "Pasta Espagueti 500g", quantity: 2, price: 0.89, total: 1.78 },
        { id: 108, name: "Tomates 1kg", quantity: 1, price: 2.15, total: 2.15 },
        { id: 109, name: "Papel Higiénico Doble Capa 12 rollos", quantity: 1, price: 2.75, total: 2.75 },
        { id: 110, name: "Yogur Natural Pack-8", quantity: 1, price: 1.6, total: 1.6 },
        { id: 111, name: "Detergente Lavadora Concentrado", quantity: 1, price: 3.25, total: 3.25 },
        { id: 112, name: "Manzanas Golden 1kg", quantity: 1, price: 1.99, total: 1.99 },
      ],
    },
    {
      id: 2,
      date: "2023-03-28",
      location: "Compra Online",
      type: "online",
      total: 78.32,
      items: 18,
      ticketItems: [
        { id: 201, name: "Leche Hacendado Semidesnatada", quantity: 6, price: 0.79, total: 4.74 },
        { id: 202, name: "Pan de Molde Integral", quantity: 2, price: 1.2, total: 2.4 },
        { id: 203, name: "Huevos Camperos Clase M", quantity: 2, price: 2.35, total: 4.7 },
        { id: 204, name: "Plátano de Canarias 1kg", quantity: 2, price: 1.89, total: 3.78 },
        { id: 205, name: "Pollo Entero", quantity: 2, price: 4.95, total: 9.9 },
        { id: 206, name: "Aceite de Oliva Virgen Extra 1L", quantity: 2, price: 4.5, total: 9.0 },
        { id: 207, name: "Pasta Espagueti 500g", quantity: 4, price: 0.89, total: 3.56 },
        { id: 208, name: "Tomates 1kg", quantity: 2, price: 2.15, total: 4.3 },
        { id: 209, name: "Papel Higiénico Doble Capa 12 rollos", quantity: 2, price: 2.75, total: 5.5 },
        { id: 210, name: "Yogur Natural Pack-8", quantity: 2, price: 1.6, total: 3.2 },
        { id: 211, name: "Detergente Lavadora Concentrado", quantity: 2, price: 3.25, total: 6.5 },
        { id: 212, name: "Manzanas Golden 1kg", quantity: 2, price: 1.99, total: 3.98 },
      ],
    },
    {
      id: 3,
      date: "2023-03-15",
      location: "Mercadona Plaza Mayor",
      type: "store",
      total: 32.45,
      items: 8,
      ticketItems: [
        { id: 301, name: "Leche Hacendado Semidesnatada", quantity: 2, price: 0.79, total: 1.58 },
        { id: 302, name: "Pan de Molde Integral", quantity: 1, price: 1.2, total: 1.2 },
        { id: 303, name: "Huevos Camperos Clase M", quantity: 1, price: 2.35, total: 2.35 },
        { id: 304, name: "Plátano de Canarias 1kg", quantity: 1, price: 1.89, total: 1.89 },
        { id: 305, name: "Pollo Entero", quantity: 1, price: 4.95, total: 4.95 },
        { id: 306, name: "Aceite de Oliva Virgen Extra 1L", quantity: 1, price: 4.5, total: 4.5 },
        { id: 307, name: "Pasta Espagueti 500g", quantity: 1, price: 0.89, total: 0.89 },
        { id: 308, name: "Tomates 1kg", quantity: 1, price: 2.15, total: 2.15 },
      ],
    },
    {
      id: 4,
      date: "2023-03-02",
      location: "Mercadona Calle Gran Vía",
      type: "store",
      total: 56.78,
      items: 15,
      ticketItems: [
        { id: 401, name: "Leche Hacendado Semidesnatada", quantity: 3, price: 0.79, total: 2.37 },
        { id: 402, name: "Pan de Molde Integral", quantity: 2, price: 1.2, total: 2.4 },
        { id: 403, name: "Huevos Camperos Clase M", quantity: 1, price: 2.35, total: 2.35 },
        { id: 404, name: "Plátano de Canarias 1kg", quantity: 2, price: 1.89, total: 3.78 },
        { id: 405, name: "Pollo Entero", quantity: 1, price: 4.95, total: 4.95 },
        { id: 406, name: "Aceite de Oliva Virgen Extra 1L", quantity: 1, price: 4.5, total: 4.5 },
        { id: 407, name: "Pasta Espagueti 500g", quantity: 3, price: 0.89, total: 2.67 },
        { id: 408, name: "Tomates 1kg", quantity: 2, price: 2.15, total: 4.3 },
      ],
    },
    {
      id: 5,
      date: "2023-02-20",
      location: "Compra Online",
      type: "online",
      total: 65.9,
      items: 16,
      ticketItems: [
        { id: 501, name: "Leche Hacendado Semidesnatada", quantity: 4, price: 0.79, total: 3.16 },
        { id: 502, name: "Pan de Molde Integral", quantity: 2, price: 1.2, total: 2.4 },
        { id: 503, name: "Huevos Camperos Clase M", quantity: 2, price: 2.35, total: 4.7 },
        { id: 504, name: "Plátano de Canarias 1kg", quantity: 2, price: 1.89, total: 3.78 },
        { id: 505, name: "Pollo Entero", quantity: 1, price: 4.95, total: 4.95 },
        { id: 506, name: "Aceite de Oliva Virgen Extra 1L", quantity: 1, price: 4.5, total: 4.5 },
        { id: 507, name: "Pasta Espagueti 500g", quantity: 4, price: 0.89, total: 3.56 },
      ],
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-4">
      <SectionTitle
        title="Historial de compras"
        subtitle="Tus últimas compras en tienda y online"
        icon="shopping-bag"
      />

      <div className="mt-4 space-y-3">
        {purchaseHistory.map((purchase) => (
          <div
            key={purchase.id}
            className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedPurchase(purchase)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-2">
                <div className={`p-2 rounded-full ${purchase.type === "online" ? "bg-blue-100" : "bg-green-100"}`}>
                  {purchase.type === "online" ? (
                    <ShoppingBag size={16} className="text-blue-600" />
                  ) : (
                    <MapPin size={16} className="text-green-600" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{purchase.location}</h4>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Calendar size={12} className="mr-1" />
                    {formatDate(purchase.date)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{purchase.total.toFixed(2)}€</p>
                <p className="text-xs text-gray-500">{purchase.items} artículos</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-green-600 font-medium">Ver historial completo</button>
      </div>

      {selectedPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-bold">Ticket de compra</h3>
              <button onClick={() => setSelectedPurchase(null)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b">
              <h4 className="font-medium">{selectedPurchase.location}</h4>
              <p className="text-sm text-gray-600">{formatDate(selectedPurchase.date)}</p>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left pb-2">Producto</th>
                    <th className="text-center pb-2">Cant.</th>
                    <th className="text-right pb-2">Precio</th>
                    <th className="text-right pb-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selectedPurchase.ticketItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-2 pr-2">{item.name}</td>
                      <td className="py-2 text-center">{item.quantity}</td>
                      <td className="py-2 text-right">{item.price.toFixed(2)}€</td>
                      <td className="py-2 text-right font-medium">{item.total.toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t p-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Subtotal:</span>
                <span>{(selectedPurchase.total * 0.79).toFixed(2)}€</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">IVA (21%):</span>
                <span>{(selectedPurchase.total * 0.21).toFixed(2)}€</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total:</span>
                <span>{selectedPurchase.total.toFixed(2)}€</span>
              </div>
            </div>

            <div className="border-t p-4 flex justify-center">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md font-medium"
                onClick={() => setSelectedPurchase(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
