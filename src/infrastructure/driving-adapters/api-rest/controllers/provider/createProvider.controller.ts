import { NextFunction, Request, Response } from 'express'
import { DynamoDBProviderRepository } from '../../../../implementations/AWS/dynamo-db/DynamoDBProviderRepository'
import { ProviderCreatorUseCase } from '../../../../../application/useCases/ProviderCreator'
import { validatePermission } from '../../utils'
import permissionsList from '../../permission.json'
import { PermissionNotAvailableException } from '../../../../../domain/exceptions/common/PermissionNotAvailable.exception'
import { v4 as uuidv4 } from 'uuid'

export const createProvider = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    businessName,
    name,
    cuit,
    phone,
    email,
    wayPay,
    observations,
    products,
    accounts
  } = req.body

  const { sessionUser } = req.params

  const dynamoDBProviderRepo = new DynamoDBProviderRepository()
  const providerCreatorUseCase = new ProviderCreatorUseCase(dynamoDBProviderRepo)

  try {
    const session = JSON.parse(sessionUser)
    const doesSuperAdminHavePermission = true
    const havePermission = validatePermission(permissionsList.provider.provider_create, session.data.permissions, doesSuperAdminHavePermission)

    if (!havePermission) throw new PermissionNotAvailableException()

    const providerCreated = await providerCreatorUseCase.run({
      id: uuidv4(),
      businessName,
      name,
      cuit,
      phone,
      email,
      wayPay: {
        code: wayPay.code,
        description: wayPay.description
      },
      observations,
      products,
      accounts
    })

    res.json(providerCreated)
    return
  } catch (error) {
    return next(error)
  }
}
