import { Provider } from '../../domain/entities/Provider.entity'

export interface ProviderRepository {
  save: (provider: Provider) => Promise<Provider>
  getById: (id: string) => Promise<Provider | null>
  getAll: () => Promise<Provider[]>
  update: (provider: Provider) => Promise<Provider | null>
}
