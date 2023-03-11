export interface Account {
  bank: {
    code: string
    description: string
  }
  number: string
  cvu: string
  alias: string
}

export interface Provider {
  id: string
  businessName: string
  name: string
  cuit: string
  phone: string
  email?: string
  wayPay?: {
    code: string
    description: string
  }
  observations?: string
  products?: string[]
  accounts?: Account[]
}
