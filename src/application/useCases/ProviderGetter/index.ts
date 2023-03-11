import { Provider } from '../../../domain/entities/Provider.entity'
import { ProviderRepository } from '../../../domain/repositories/Provider.repository'

export class ProviderGetterUseCase {
  private readonly _providerRepository: ProviderRepository

  constructor (providerRepository: ProviderRepository) {
    this._providerRepository = providerRepository
  }

  async run (): Promise<Provider[]> {
    const provider: Provider[] = await this._providerRepository.getAll()
    return provider
  }
}
