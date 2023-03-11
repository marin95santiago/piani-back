import path from 'path'
import * as dotenv from 'dotenv'
import { DynamoDBClient, PutItemCommand, ScanCommand, GetItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { User } from 'domain/entities/User.entity'
import { UserRepository } from '../../../../domain/repositories/User.repository'

dotenv.config({
  path: path.resolve(__dirname, '../../../../../.env')
})

export class DynamoDBUserRepository implements UserRepository {
  private readonly client = new DynamoDBClient({ region: 'us-east-1' })
  private readonly _environment: string = process.env.ENVIRONMENT ?? ''
  private readonly _project: string = process.env.PROJECT ?? ''
  private readonly _table: string = 'Users'

  async save (user: User): Promise<User> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`,
      Item: marshall({
        id: user.id ?? '',
        username: user.username ?? '',
        password: user.password ?? '',
        name: user.name ?? '',
        lastname: user.lastname ?? '',
        dni: user.dni ?? 0,
        cuil: user.cuil ?? '',
        birthday: user.birthday ?? null,
        address: user.address ?? null,
        position: user.position ?? '',
        startDate: user.startDate ?? '',
        phone: user.phone ?? null,
        email: user.email ?? null,
        state: user.state ?? '',
        permissions: user.permissions ?? ['']
      })
    }
    await this.client.send(new PutItemCommand(params))

    return user
  }

  async getAll (): Promise<User[]> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`
    }
    const response = await this.client.send(new ScanCommand(params))

    const items = (response.Items !== undefined) ? response.Items : []

    const users = items.map((item: any) => {
      return {
        id: item.id.S ?? '',
        name: item.name.S ?? '',
        username: item.username.S ?? '',
        lastname: item.lastname.S ?? '',
        dni: Number(item.dni.N) ?? 0,
        cuil: item.cuil.S ?? '',
        birthday: item.birthday?.S ?? undefined,
        address: {
          street: item.address?.M?.street.S,
          number: Number(item.address?.M?.number.N) ?? 0,
          floor: item.address?.M?.floor.S,
          department: item.address?.M?.department.S,
          province: {
            code: item.address?.M?.province?.M?.code.S !== undefined ? item.address.M.province.M.code.S : '',
            description: item.address?.M?.province?.M?.description.S !== undefined ? item.address.M.province.M.description.S : ''
          },
          country: {
            code: item.address?.M?.country?.M?.code.S !== undefined ? item.address.M.country.M.code.S : '',
            description: item.address?.M?.country?.M?.description.S !== undefined ? item.address.M.country.M.description.S : ''
          }
        },
        position: {
          code: item.position?.M?.code.S !== undefined ? item.position.M.code.S : '',
          description: item.position?.M?.description.S !== undefined ? item.position.M.description.S : ''
        },
        startDate: item.startDate.S ?? '',
        phone: (item.phone?.N !== undefined) ? Number(item.phone.N) : undefined,
        email: item.email?.S ?? undefined,
        state: {
          code: item.state.M?.code.S !== undefined ? item.state.M.code.S : '',
          description: item.state.M?.description.S !== undefined ? item.state.M.description.S : ''
        },
        permissions: item.permissions.L !== undefined
          ? item.permissions.L.map((permission: { S: string | undefined }) => {
            if (permission.S !== undefined) {
              return permission.S
            } else {
              return ''
            }
          })
          : ['']
      }
    })

    return users
  }

  async getById (id: string): Promise<User | null> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`,
      Key: marshall({
        id
      })
    }
    const response = await this.client.send(new GetItemCommand(params))

    const item = (response.Item !== undefined) ? response.Item : null

    if (item === null) return null
    const user = {
      id: item.id.S ?? '',
      name: item.name.S ?? '',
      username: item.username.S ?? '',
      lastname: item.lastname.S ?? '',
      dni: Number(item.dni.N) ?? 0,
      cuil: item.cuil.S ?? '',
      birthday: item.birthday?.S ?? undefined,
      address: {
        street: item.address?.M?.street.S,
        number: Number(item.address?.M?.number.N) ?? 0,
        floor: item.address?.M?.floor.S,
        department: item.address?.M?.department.S,
        province: {
          code: item.address?.M?.province?.M?.code.S !== undefined ? item.address.M.province.M.code.S : '',
          description: item.address?.M?.province?.M?.description.S !== undefined ? item.address.M.province.M.description.S : ''
        },
        country: {
          code: item.address?.M?.country?.M?.code.S !== undefined ? item.address.M.country.M.code.S : '',
          description: item.address?.M?.country?.M?.description.S !== undefined ? item.address.M.country.M.description.S : ''
        }
      },
      position: {
        code: item.position?.M?.code.S !== undefined ? item.position.M.code.S : '',
        description: item.position?.M?.description.S !== undefined ? item.position.M.description.S : ''
      },
      startDate: item.startDate?.S ?? '',
      phone: (item.phone?.N !== undefined) ? Number(item.phone.N) : undefined,
      email: item.email?.S ?? undefined,
      state: {
        code: item.state.M?.code.S !== undefined ? item.state.M.code.S : '',
        description: item.state.M?.description.S !== undefined ? item.state.M.description.S : ''
      },
      permissions: item.permissions.L !== undefined
        ? item.permissions.L.map(permission => {
          if (permission.S !== undefined) {
            return permission.S
          } else {
            return ''
          }
        })
        : ['']
    }

    return user
  }

  async getByUserName (username: string): Promise<User | null> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: marshall({
        ':username': username
      })
    }
    const response = await this.client.send(new ScanCommand(params))

    const item = (response.Items !== undefined && response.Items.length > 0) ? response.Items[0] : null

    if (item === null) return null

    const user = {
      id: item.id.S ?? '',
      name: item.name.S ?? '',
      username: item.username.S ?? '',
      password: item.password?.S ?? '',
      lastname: item.lastname.S ?? '',
      dni: Number(item.dni.N) ?? 0,
      cuil: item.cuil.S ?? '',
      birthday: item.birthday?.S ?? undefined,
      address: {
        street: item.address?.M?.street.S,
        number: Number(item.address?.M?.number.N) ?? 0,
        floor: item.address?.M?.floor.S,
        department: item.address?.M?.department.S,
        province: {
          code: item.address?.M?.province?.M?.code.S !== undefined ? item.address.M.province.M.code.S : '',
          description: item.address?.M?.province?.M?.description.S !== undefined ? item.address.M.province.M.description.S : ''
        },
        country: {
          code: item.address?.M?.country?.M?.code.S !== undefined ? item.address.M.country.M.code.S : '',
          description: item.address?.M?.country?.M?.description.S !== undefined ? item.address.M.country.M.description.S : ''
        }
      },
      position: {
        code: item.position?.M?.code.S !== undefined ? item.position.M.code.S : '',
        description: item.position?.M?.description.S !== undefined ? item.position.M.description.S : ''
      },
      startDate: item.startDate.S ?? '',
      phone: (item.phone?.N !== undefined) ? Number(item.phone.N) : undefined,
      email: item.email?.S ?? undefined,
      state: {
        code: item.state.M?.code.S !== undefined ? item.state.M.code.S : '',
        description: item.state.M?.description.S !== undefined ? item.state.M.description.S : ''
      },
      permissions: item.permissions.L !== undefined
        ? item.permissions.L.map(permission => {
          if (permission.S !== undefined) {
            return permission.S
          } else {
            return ''
          }
        })
        : ['']
    }
    return user
  }

  async update (user: User): Promise<User> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`,
      Item: marshall({
        id: user.id,
        name: user.name,
        username: user.username,
        lastname: user.lastname,
        dni: user.dni,
        cuil: user.cuil,
        birthday: user.birthday,
        address: user.address,
        position: user.position,
        startDate: user.startDate,
        phone: user.phone,
        email: user.email,
        state: user.state,
        permissions: user.permissions
      },
      {
        removeUndefinedValues: true
      })
    }
    await this.client.send(new PutItemCommand(params))

    return user
  }

  async delete (id: string): Promise<void> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`,
      Key: marshall({
        id
      })
    }
    await this.client.send(new DeleteItemCommand(params))
  }
}
