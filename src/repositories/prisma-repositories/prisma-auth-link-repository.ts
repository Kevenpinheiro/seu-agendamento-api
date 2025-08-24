import { Prisma } from '@prisma/client'
import { AuthLinkRepository } from '../auth-link-repository'
import { prisma } from '@/database/prisma'

export class PrismaAuthLinkRepository implements AuthLinkRepository {
  async findByCode(code: string) {
    return await prisma.authLink.findFirst({
      where: {
        code,
      },
    })
  }

  async createAuthLink(data: Prisma.AuthLinkUncheckedCreateInput) {
    return prisma.authLink.create({
      data,
    })
  }

  async deleteCode(code: string) {
    await prisma.authLink.delete({
      where: {
        code,
      },
    })
  }
}
