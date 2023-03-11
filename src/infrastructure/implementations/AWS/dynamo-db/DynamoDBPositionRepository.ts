import path from 'path'
import * as dotenv from 'dotenv'
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb'
import { Position } from 'domain/entities/Position.entity'
import { PositionRepository } from '../../../../domain/repositories/Position.repository'

dotenv.config({
  path: path.resolve(__dirname, '../../../../../.env')
})

export class DynamoDBPositionRepository implements PositionRepository {
  private readonly client = new DynamoDBClient({ region: 'us-east-1' })
  private readonly _environment: string = process.env.ENVIRONMENT ?? ''
  private readonly _project: string = process.env.PROJECT ?? ''
  private readonly _table: string = 'Positions'

  async getAll (): Promise<Position[]> {
    const params = {
      TableName: `${this._project}-${this._environment}-${this._table}`
    }
    const response = await this.client.send(new ScanCommand(params))

    const items = (response.Items !== undefined) ? response.Items : []

    const positions = items.map((item: any) => {
      return {
        code: item.code.S ?? '',
        description: item.description.S ?? '',
        permissionsAvailable: item.permissionsAvailable.L !== undefined
          ? item.permissionsAvailable.L.map((permission: { S: string | undefined }) => {
            if (permission.S !== undefined) {
              return permission.S
            } else {
              return ''
            }
          })
          : ['']
      }
    })

    return positions
  }
}
