import bcrypt from 'bcrypt'
import { UserRepository } from '../../../domain/repositories/User.repository'
import { ExistUserByUsernameService } from '../../../domain/services/user/ExistUserByUsername.service'
import { UserAlreadyExistException } from '../../../domain/exceptions/user/UserAlreadyExist.exception'
import { User } from '../../../domain/entities/User.entity'
import { MissingPropertyException } from '../../../domain/exceptions/common/MissingProperty.exception'

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUsernameService: ExistUserByUsernameService

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUsernameService = new ExistUserByUsernameService(userRepository)
  }

  async run (body: User): Promise<User> {
    const existUser: boolean = await this._existUserByUsernameService.run(body.username)

    if (existUser) throw new UserAlreadyExistException()

    if (body.password === undefined || body.password === '') throw new MissingPropertyException('password')
    if (body.username === undefined || body.username === '') throw new MissingPropertyException('username')
    if (body.dni === undefined || body.dni === 0) throw new MissingPropertyException('dni')
    if (body.cuil === undefined || body.cuil === '') throw new MissingPropertyException('cuil')
    if (body.name === undefined || body.name === '') throw new MissingPropertyException('name')

    // Encrypt password
    bcrypt.hash(body.password, 12, async (err, hash) => {
      if (err !== undefined) throw new Error('error')
      body.password = hash
      await this._userRepository.save(body)
    })

    // Protect password
    delete body.password
    return body
  }
}
