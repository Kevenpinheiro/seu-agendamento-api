import { User, Prisma } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { prisma } from '@/database/prisma'

export class PrismaUserRepository implements UserRepository {
  async findById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        phone,
      },
    })

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
