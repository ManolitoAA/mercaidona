export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  image: string
  quantity: number
  isOnSale?: boolean
  isHealthy?: boolean
  isFrequent?: boolean
  category: string
  lastPurchased?: string
  purchaseFrequency?: string
}
