import { Prisma, TimeSlot } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { TimeSlotsRepository } from '../establishment-time-slots-repository'

export class PrismaEstablishmentTimeSlotsRepository
  implements TimeSlotsRepository
{
  async findById(id: string): Promise<TimeSlot | null> {
    return await prisma.timeSlot.findFirst({
      where: {
        id,
      },
    })
  }

  async isTimeAvailable(
    dayOfWeek: number,
    startTime: string,
    endTime: string,
  ): Promise<TimeSlot | null> {
    const timeSlot = await prisma.timeSlot.findFirst({
      where: {
        dayOfWeek,
        startTime,
        endTime,
      },
    })

    return timeSlot
  }

  async findMany(establishmentId: string): Promise<TimeSlot[]> {
    const availableTimes = await prisma.timeSlot.findMany({
      where: {
        establishmentId,
      },
    })

    return availableTimes
  }

  async create(data: Prisma.TimeSlotUncheckedCreateInput): Promise<TimeSlot> {
    const timeSlot = await prisma.timeSlot.create({
      data,
    })

    return timeSlot
  }
}
