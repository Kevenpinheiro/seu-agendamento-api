import { TimeSlot } from '@prisma/client'

import { EstablishmentRepository } from '@/repositories/establishment-repository'
import { TimeSlotsRepository } from '@/repositories/establishment-time-slots-repository'

import { EstablishmentNotFoundError } from './errors/establishment-not-found'
import { TimeSlotAlreadyExistsError } from './errors/time-slot-already-exists'


interface CreateTimeSlotsUseCaseRequest {
  establishmentId: string
  dayOfWeek: number
  startTime: string
  endTime: string
}

interface CreateTimeSlotsUseCaseResponse {
  timeSlot: TimeSlot
}

export class CreateTimeSlotsUseCase {
  constructor(
    private establishmentRepository: EstablishmentRepository,
    private timeSlotRepository: TimeSlotsRepository,
  ) {}

  async execute({
    establishmentId,
    dayOfWeek,
    startTime,
    endTime,
  }: CreateTimeSlotsUseCaseRequest): Promise<CreateTimeSlotsUseCaseResponse> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId)

    if (!establishment) {
      throw new EstablishmentNotFoundError()
    }

    const existingTimeSlot = await this.timeSlotRepository.isTimeAvailable(
      dayOfWeek,
      startTime,
      endTime,
    )

    if (existingTimeSlot) {
      throw new TimeSlotAlreadyExistsError()
    }

    const timeSlot = await this.timeSlotRepository.create({
      establishmentId,
      dayOfWeek,
      startTime,
      endTime,
    })

    return { timeSlot }
  }
}
