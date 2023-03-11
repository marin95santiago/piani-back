/* eslint-disable @typescript-eslint/indent */
export interface User {
  id: string
  username: string
  password?: string
  name: string
  lastname: string
  dni: number
  cuil: string
  birthday?: string
  address?: {
    street?: string
    number?: number
    floor?: string
    department?: string
    province?: {
      code: string
      description: string
    }
    country?: {
      code: string
      description: string
    }
  }
  position?: {
    code: string
    description: string
  }
  startDate: string
  phone?: number
  email?: string
  state?: {
    code: string
    description: string
  }
  permissions: string[]
}
