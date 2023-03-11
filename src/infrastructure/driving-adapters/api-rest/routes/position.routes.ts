import { Router } from 'express'
import { validateToken } from '../middlewares/tokenHandler.middleware'

import {
  getAllPositionsController
} from '../controllers/index'

const route = Router()

route.get('', validateToken, getAllPositionsController)

export default route
