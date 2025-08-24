import { Establishment, Prisma } from '@prisma/client'
import { EstablishmentRepository } from '../establishment-repository'
import { prisma } from '@/database/prisma'

export class PrismaEstablishmentRepository implements EstablishmentRepository {
  async findById(id: string) {
    return await prisma.establishment.findFirst({
      where: {
        id,
      },
    })
  }

  async findByEmail(email: string): Promise<Establishment | null> {
    const establishment = await prisma.establishment.findFirst({
      where: {
        email,
      },
    })

    return establishment
  }

  async findByPhone(phone: string): Promise<Establishment | null> {
    const establishment = await prisma.establishment.findFirst({
      where: {
        phone,
      },
    })

    return establishment
  }

  async create(
    data: Prisma.EstablishmentUncheckedCreateInput,
  ): Promise<Establishment> {
    const establishment = await prisma.establishment.create({
      data,
    })

    return establishment
  }
}
