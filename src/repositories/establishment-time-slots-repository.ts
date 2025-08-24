import { Prisma, TimeSlot } from '@prisma/client'

export interface TimeSlotsRepository {
  findById(id: string): Promise<TimeSlot | null>
  isTimeAvailable(
    dayOfWeek: number,
    startTime: string,
    endTime: string,
  ): Promise<TimeSlot | null>

  findMany(establishmentId: string): Promise<TimeSlot[]>

  create(data: Prisma.TimeSlotUncheckedCreateInput): Promise<TimeSlot>
}
