import { PrismaUserRepository } from '@/repositories/prisma-repositories/prisma-user-repository'
import { CreateUserUseCase } from '../create-user'

export function MakeCreateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const registerUserUseCase = new CreateUserUseCase(prismaUserRepository)

  return registerUserUseCase
}
