import { Position } from '../../domain/entities/Position.entity'

export interface PositionRepository {
  getAll: () => Promise<Position[]>
}
