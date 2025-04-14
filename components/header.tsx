import Image from "next/image"
import { Search } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 w-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 relative">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Mercadona logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-green-600">MercAIdona</h1>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Buscar">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-2">
        <p className="text-sm text-gray-600">Recomendaciones personalizadas basadas en tus compras</p>
      </div>
    </header>
  )
}
