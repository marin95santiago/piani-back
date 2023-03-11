import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../../implementations/AWS/dynamo-db/DynamoDBUserRepository'
import { UserCreatorUseCase } from '../../../../../application/useCases/UserCreator'
import { validatePermission } from '../../utils'
import permissionsList from '../../permission.json'
import { PermissionNotAvailableException } from '../../../../../domain/exceptions/common/PermissionNotAvailable.exception'
import { v4 as uuidv4 } from 'uuid'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    password,
    name,
    birthday,
    lastname,
    dni,
    cuil,
    address,
    position,
    startDate,
    state,
    permissions,
    email,
    phone
  } = req.body

  const { sessionUser } = req.params

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo)

  try {
    const session = JSON.parse(sessionUser)
    const doesSuperAdminHavePermission = true
    const havePermission = validatePermission(permissionsList.user.user_create, session.data.permissions, doesSuperAdminHavePermission)

    if (!havePermission) throw new PermissionNotAvailableException()

    const userCreated = await userCreatorUseCase.run({
      id: uuidv4(),
      username,
      password,
      name,
      lastname,
      dni: Number(dni),
      cuil,
      birthday,
      email,
      phone,
      address: {
        street: address.street,
        number: Number(address.number),
        floor: address.floor,
        department: address.department,
        province: {
          code: address.province.code,
          description: address.province.description
        },
        country: {
          code: address.country.code,
          description: address.country.description
        }
      },
      position: {
        code: position.code,
        description: position.description
      },
      startDate,
      state: {
        code: state.code,
        description: state.description
      },
      permissions
    })

    res.json(userCreated)
    return
  } catch (error) {
    return next(error)
  }
}
