import { GetUserByIdService } from '../../../domain/services/user/GetUserById.service'
import { User } from '../../../domain/entities/User.entity'
import { UserRepository } from '../../../domain/repositories/User.repository'
import { UserNotFoundException } from '../../../domain/exceptions/user/UserNotFound.exception'

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _getUserByIdService: GetUserByIdService

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._getUserByIdService = new GetUserByIdService(userRepository)
  }

  async run (body: User | any): Promise<User | null> {
    const userToUpdate = await this._getUserByIdService.run(body?.id)

    if (userToUpdate === null) throw new UserNotFoundException()

    userToUpdate.name = body.name ?? userToUpdate.name
    userToUpdate.username = body.username ?? userToUpdate.username
    userToUpdate.lastname = body.lastname ?? userToUpdate.lastname
    userToUpdate.dni = body.dni ?? userToUpdate.dni
    userToUpdate.cuil = body.cuil ?? userToUpdate.cuil
    userToUpdate.birthday = body.birthday ?? userToUpdate.birthday
    userToUpdate.address = {
      street: body.address?.street ?? userToUpdate.address?.street,
      number: body.address?.number ?? userToUpdate.address?.number,
      floor: body.address?.floor ?? userToUpdate.address?.floor,
      department: body.address?.department ?? userToUpdate.address?.department,
      province: body.address?.province ?? userToUpdate.address?.province,
      country: body.address?.country ?? userToUpdate.address?.country
    }
    userToUpdate.position = body.position ?? userToUpdate.position
    userToUpdate.startDate = body.startDate ?? userToUpdate.startDate
    userToUpdate.phone = body.phone ?? userToUpdate.phone
    userToUpdate.email = body.email ?? userToUpdate.email
    userToUpdate.state = body.state ?? userToUpdate.state
    userToUpdate.permissions = body.permissions ?? userToUpdate.permissions

    const userUpdated = await this._userRepository.update(userToUpdate)
    return userUpdated
  }
}
