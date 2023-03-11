import { Position } from '../../../domain/entities/Position.entity'
import { PositionRepository } from '../../../domain/repositories/Position.repository'

export class PositionGetterUseCase {
  private readonly _positionRepository: PositionRepository

  constructor (positionRepository: PositionRepository) {
    this._positionRepository = positionRepository
  }

  async run (): Promise<Position[]> {
    const users: Position[] = await this._positionRepository.getAll()
    return users
  }
}
