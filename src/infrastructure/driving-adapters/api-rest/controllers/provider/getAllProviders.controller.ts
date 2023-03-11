import { NextFunction, Request, Response } from 'express'
import { validatePermission } from '../../utils'
import permissionsList from '../../permission.json'
import { PermissionNotAvailableException } from '../../../../../domain/exceptions/common/PermissionNotAvailable.exception'
import { DynamoDBProviderRepository } from '../../../../implementations/AWS/dynamo-db/DynamoDBProviderRepository'
import { ProviderGetterUseCase } from '../../../../../application/useCases/ProviderGetter'

export const getAllProviders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { sessionUser } = req.params
  const dynamoDBProviderRepo = new DynamoDBProviderRepository()
  const providerGetterUseCase = new ProviderGetterUseCase(dynamoDBProviderRepo)

  try {
    const session = JSON.parse(sessionUser)
    const doesSuperAdminHavePermission = true
    const havePermission = validatePermission(permissionsList.provider.provider_view, session.data.permissions, doesSuperAdminHavePermission)

    if (!havePermission) throw new PermissionNotAvailableException()

    const providers = await providerGetterUseCase.run()
    res.json(providers)
    return
  } catch (e) {
    return next(e)
  }
}
