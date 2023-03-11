import { ProviderRepository } from '../../../domain/repositories/Provider.repository'
import { Provider } from '../../../domain/entities/Provider.entity'
import { MissingPropertyException } from '../../../domain/exceptions/common/MissingProperty.exception'

export class ProviderCreatorUseCase {
  private readonly _providerRepository: ProviderRepository

  constructor (providerRepository: ProviderRepository) {
    this._providerRepository = providerRepository
  }

  async run (body: Provider): Promise<Provider> {
    if (body.businessName === undefined || body.businessName === '') throw new MissingPropertyException('businessName')
    if (body.name === undefined || body.name === '') throw new MissingPropertyException('name')
    if (body.cuit === undefined || body.cuit === '') throw new MissingPropertyException('cuit')
    if (body.phone === undefined || body.phone === '') throw new MissingPropertyException('phone')

    return body
  }
}
