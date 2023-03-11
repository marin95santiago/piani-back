import { Router } from 'express'
import { validateToken } from '../middlewares/tokenHandler.middleware'

import {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
  getUserByIdController
} from '../controllers/index'

const route = Router()

route.delete('/:userId', validateToken, deleteUserController)
route.put('/:userId', validateToken, updateUserController)
route.get('', validateToken, getAllUsersController)
route.get('/:userId', validateToken, getUserByIdController)
route.post('', validateToken, createUserController)

export default route
