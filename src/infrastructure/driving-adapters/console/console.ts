import path from 'path'
import * as dotenv from 'dotenv'
import { UserCreatorUseCase } from '../../../application/useCases/UserCreator'
// import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'
import { DynamoDBUserRepository } from '../../../infrastructure/implementations/AWS/dynamo-db/DynamoDBUserRepository'
import { User } from '../../../domain/entities/User.entity'
import { UserGetterUseCase } from '../../../application/useCases/UserGetter'
import { UserGetterByIdUseCase } from '../../../application/useCases/UserGetterById'
import { UserUpdaterUseCase } from '../../../application/useCases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/useCases/UserDeleter'

(async () => {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })
  const repository = new DynamoDBUserRepository()

  /*
  // Crear Usuario
  console.log('Creando usuario')
  const userCreatorUseCase = new UserCreatorUseCase(repository)
  await userCreatorUseCase.run({
    id: 'abc124',
    username: 'santi95',
    password: 'criptada',
    name: 'Santiago',
    lastname: 'Marín Montoya',
    dni: 96111834,
    cuil: '96111834-5',
    address: {
      street: 'Avenida los incas',
      number: 5193,
      floor: '3',
      department: 'I',
      province: {
        code: '1',
        description: 'Buenos Aires'
      },
      country: {
        code: '1',
        description: 'Argentina'
      }
    },
    position: {
      code: '1',
      description: 'admin'
    },
    startDate: '12/01/2022',
    state: {
      code: '1',
      description: 'Activo'
    },
    permissions: ['hall_view']
  })
  console.log('Usuario creado con éxito')
  */

  /*
  // Obtener Usuarios
  const userGetterUseCase = new UserGetterUseCase(repository)
  let users: User[] = await userGetterUseCase.run()
  console.log('Usuarios en DB', users)
  */

  /*
  // Obtener usuario por Id
  const userGetterByIdUseCase = new UserGetterByIdUseCase(repository)
  const user = await userGetterByIdUseCase.run('abc124')
  console.log(user)
  */


  // Actualizar usuario
  const userUpdaterUseCase = new UserUpdaterUseCase(repository)
  const userUpdated = await userUpdaterUseCase.run({
    id: 'abc124',
    name: 'Santiago Juan',
    permissions: ['hall_view', 'hall_edit']
  })
  console.log('Usuario actualizado', userUpdated)


  /*
  // Eliminar usuario
  const userDeleterUseCase = new UserDeleterUseCase(repository)
  await userDeleterUseCase.run('abc124')
  console.log('Usuario eliminado')
  */
})()
