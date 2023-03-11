import { User } from '../../../domain/entities/User.entity'
import { UserRepository } from '../../../domain/repositories/User.repository'

export class InMemoryUserRepository implements UserRepository {
  private userData: User[] = []

  async getAll (): Promise<User[]> {
    return this.userData
  }

  async save (user: User): Promise<User> {
    this.userData.push(user)
    return user
  }

  async getByUserName (username: string): Promise<User | null> {
    const userFound = this.userData.find(user => user.username === username)

    if (userFound === undefined) return null

    return userFound
  }

  async update (userIn: User): Promise<User | null> {
    this.userData.forEach(user => {
      if (user.id === userIn.id) {
        user.age = userIn.age
        user.name = userIn.name
        user.username = userIn.username
      }
    })
    return userIn
  }

  async delete (id: string): Promise<void> {
    this.userData = this.userData.filter(user => user.id !== id)
  }

  async getById (id: string): Promise<User | null> {
    const userFound = this.userData.find(user => user.id === id)

    if (userFound === undefined) return null

    return userFound
  }
}
