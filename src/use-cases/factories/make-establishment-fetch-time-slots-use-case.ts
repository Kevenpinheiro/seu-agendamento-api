import { PrismaEstablishmentTimeSlotsRepository } from '@/repositories/prisma-repositories/prisma-establishment-time-slot-repository'
import { FetchEstablishmentTimeSlotsUseCase } from '../fetch-establishment-time-slots'

export function makeFetchEstablishmentTimeSlotsUseCase() {
  const establishmentTimeSlots = new PrismaEstablishmentTimeSlotsRepository()
  
  const useCase = new FetchEstablishmentTimeSlotsUseCase(establishmentTimeSlots)

  return useCase
}
