import { NextFunction, Request, Response } from 'express'
import { DynamoDBPositionRepository } from '../../../../implementations/AWS/dynamo-db/DynamoDBPositionRepository'
import { PositionGetterUseCase } from '../../../../../application/useCases/PositionGetter'

export const getAllPositions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const dynamoDBPositionRepo = new DynamoDBPositionRepository()
  const positionGetterUseCase = new PositionGetterUseCase(dynamoDBPositionRepo)

  try {
    const users = await positionGetterUseCase.run()
    res.json(users)
    return
  } catch (e) {
    return next(e)
  }
}
