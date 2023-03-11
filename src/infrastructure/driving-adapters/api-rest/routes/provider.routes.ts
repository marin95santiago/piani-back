import { Router } from 'express'
import { validateToken } from '../middlewares/tokenHandler.middleware'

import {
  createProviderController,
  getAllProvidersController
} from '../controllers/index'

const route = Router()

route.post('', validateToken, createProviderController)
route.get('', validateToken, getAllProvidersController)

export default route
