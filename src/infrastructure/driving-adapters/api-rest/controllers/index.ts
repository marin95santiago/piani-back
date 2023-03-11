import { createUser } from './user/createUser.controller'
import { getAllUsers } from './user/getAllUsers.controller'
import { getUserById } from './user/getUserById.controller'
import { updateUser } from './user/updateUser.controller'
import { deleteUser } from './user/deleteUser.controller'

// Login controller
import { login } from './login/login.controller'
import { validateToken } from './login/validateToken.controller'

// Position controller
import { getAllPositions } from './position/getAllPositions.controller'

// Provider controller
import { createProvider } from './provider/createProvider.controller'
import { getAllProviders } from './provider/getAllProviders.controller'

export {
  createUser as createUserController,
  getAllUsers as getAllUsersController,
  getUserById as getUserByIdController,
  updateUser as updateUserController,
  deleteUser as deleteUserController,
  login as loginController,
  validateToken as validateTokenController,
  getAllPositions as getAllPositionsController,
  createProvider as createProviderController,
  getAllProviders as getAllProvidersController
}
