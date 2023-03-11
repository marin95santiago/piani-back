import path from 'path'
import * as dotenv from 'dotenv'
import { DynamoDBClient, PutItemCommand, ScanCommand, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { Provider } from 'domain/entities/Provider.entity'
import { ProviderRepository } from '../../../../domain/repositories/Provider.repository'

dotenv.config({
  path: path.resolve(__dirname, '../../../../../.env')
})

export class DynamoDBProviderRepository implements ProviderRepository {
  private readonly client = new DynamoDBClient({ region: 'us-east-1' })
  private readonly _environment: string = process.env.ENVIRONMENT ?? ''
  private readonly _project: string = process.env.PROJECT ?? ''
  private readonly _table: string = 'Providers'

  async save (provider: Provider): Promise<Provider> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`,
      Item: marshall({
        id: provider.id ?? '',
        businessName: provider.businessName ?? '',
        name: provider.name ?? '',
        cuit: provider.cuit ?? '',
        phone: provider.phone ?? '',
        email: provider.email ?? null,
        wayPay: provider.wayPay ?? null,
        observations: provider.observations ?? null,
        products: provider.products ?? null,
        accounts: provider.accounts ?? null
      })
    }
    await this.client.send(new PutItemCommand(params))

    return provider
  }

  async getAll (): Promise<Provider[]> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`
    }
    const response = await this.client.send(new ScanCommand(params))

    const items = (response.Items !== undefined) ? response.Items : []

    const providers = items.map((item: any) => {
      return {
        id: item.id.S ?? '',
        businessName: item.businessName.S ?? '',
        name: item.name.S ?? '',
        cuit: item.cuit.S ?? '',
        phone: item.phone.S ?? '',
        email: item.email.S ?? undefined,
        wayPay: item.wayPay.M !== undefined
          ? {
              code: item.wayPay?.M?.code.S ?? '',
              description: item.wayPay?.M?.description.S ?? ''
            }
          : undefined,
        observations: item.observations.S ?? undefined,
        products: item.products.L !== undefined
          ? item.products.L.map((product: { S: string | undefined }) => {
            if (product.S !== undefined) {
              return product.S
            } else {
              return ''
            }
          })
          : undefined,
        accounts: item.accounts.L !== undefined
          ? item.accounts.L.map((account: { M: any }) => {
            if (account.M !== undefined) {
              return {
                bank: {
                  code: account.M.bank.M.code.S ?? '',
                  description: account.M.bank.M.description.S ?? ''
                },
                number: account.M.number.S ?? '',
                cvu: account.M.cvu.S ?? '',
                alias: account.M.alias.S ?? ''
              }
            } else {
              return ''
            }
          })
          : undefined
      }
    })

    return providers
  }

  async getById (id: string): Promise<Provider | null> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`,
      Key: marshall({
        id
      })
    }
    const response = await this.client.send(new GetItemCommand(params))

    const item = (response.Item !== undefined) ? response.Item : null

    if (item === null) return null
    const provider = {
      id: item.id.S ?? '',
      businessName: item.businessName.S ?? '',
      name: item.name.S ?? '',
      cuit: item.cuit.S ?? '',
      phone: item.phone.S ?? '',
      email: item.email.S ?? undefined,
      wayPay: item.wayPay.M !== undefined
        ? {
            code: item.wayPay?.M?.code.S ?? '',
            description: item.wayPay?.M?.description.S ?? ''
          }
        : undefined,
      observations: item.observations.S ?? undefined,
      products: item.products.L !== undefined
        ? item.products.L.map(product => {
          if (product.S !== undefined) {
            return product.S
          } else {
            return ''
          }
        })
        : undefined,
      accounts: item.accounts.L !== undefined
        ? item.accounts.L.map(account => {
          return {
            bank: {
              code: account.M?.bank.M?.code.S ?? '',
              description: account.M?.bank.M?.description.S ?? ''
            },
            number: account.M?.number.S ?? '',
            cvu: account.M?.cvu.S ?? '',
            alias: account.M?.alias.S ?? ''
          }
        })
        : undefined
    }

    return provider
  }

  async update (provider: Provider): Promise<Provider> {
    const params = {
      TableName: 'users',
      Item: marshall({
        id: provider.id,
        businessName: provider.businessName,
        name: provider.name,
        cuit: provider.cuit,
        phone: provider.phone,
        email: provider.email,
        wayPay: provider.wayPay,
        observations: provider.observations,
        products: provider.products,
        accounts: provider.accounts
      },
      {
        removeUndefinedValues: true
      })
    }
    await this.client.send(new PutItemCommand(params))

    return provider
  }
}
