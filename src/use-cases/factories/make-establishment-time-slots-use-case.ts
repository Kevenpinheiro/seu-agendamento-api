import { PrismaEstablishmentRepository } from '@/repositories/prisma-repositories/prisma-establishment-repository'
import { CreateTimeSlotsUseCase } from '../create-time-slots'
import { PrismaEstablishmentTimeSlotsRepository } from '@/repositories/prisma-repositories/prisma-establishment-time-slot-repository'

export function makeEstablishmentTimeSlotsUseCase() {
  const prismaEstablishmentRepository = new PrismaEstablishmentRepository()
  const prismaEstablishmentTimeSlotsRepository =
    new PrismaEstablishmentTimeSlotsRepository()

  const useCase = new CreateTimeSlotsUseCase(
    prismaEstablishmentRepository,
    prismaEstablishmentTimeSlotsRepository,
  )

  return useCase
}
