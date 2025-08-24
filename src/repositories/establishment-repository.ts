import { Prisma, Establishment } from '@prisma/client'

export interface EstablishmentRepository {
  findById(id: string): Promise<Establishment | null>

  create(data: Prisma.EstablishmentUncheckedCreateInput): Promise<Establishment>
}
