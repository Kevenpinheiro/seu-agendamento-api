import { TimeSlotsRepository } from '@/repositories/establishment-time-slots-repository'
import { TimeSlot } from '@prisma/client'

interface FetchEstablishmentTimeSlotsUseCaseRequest {
  establishmentId: string
}

interface FetchEstablishmentTimeSlotsUseCaseResponse {
  timeSlots: TimeSlot[]
}

export class FetchEstablishmentTimeSlotsUseCase {
  constructor(private timeSlotsRepository: TimeSlotsRepository) {}

  async execute({
    establishmentId,
  }: FetchEstablishmentTimeSlotsUseCaseRequest): Promise<FetchEstablishmentTimeSlotsUseCaseResponse> {
    const timeSlots = await this.timeSlotsRepository.findMany(establishmentId)

    return {
      timeSlots,
    }
  }
}
