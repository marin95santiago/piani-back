export interface Product {
  code: string
  description: string
  brand: string
  consume: {
    code: string
    description: string
  }
  measurement: {
    code: string
    description: string
  }
  quantity?: number
  stock: {
    code: string
    description: string
  }
}
