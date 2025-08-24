import { TimeSlotsRepository } from '@/repositories/establishment-time-slots-repository'
import { Prisma, TimeSlot } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryTimeSlotsRepository implements TimeSlotsRepository {
  public items: TimeSlot[] = []

  async findById(id: string): Promise<TimeSlot | null> {
    const timeSlots = this.items.find((item) => item.id === id)

    if (!timeSlots) {
      return null
    }

    return timeSlots
  }

  async findMany(establishmentId: string): Promise<TimeSlot[]> {
    return this.items.filter((item) => item.establishmentId === establishmentId)
  }

  async isTimeAvailable(
    dayOfWeek: number,
    startTime: string,
    endTime: string,
  ): Promise<TimeSlot | null> {
    const isAvailability = this.items.find(
      (availability) =>
        availability.dayOfWeek === dayOfWeek &&
        availability.startTime === startTime &&
        availability.endTime === endTime,
    )

    if (!isAvailability) {
      return null
    }

    return isAvailability
  }

  async create(data: Prisma.TimeSlotUncheckedCreateInput) {
    const timeSlots = {
      id: data.id ?? randomUUID(),
      establishmentId: data.id ?? randomUUID(),
      dayOfWeek: data.dayOfWeek,
      startTime: data.startTime,
      endTime: data.endTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(timeSlots)

    return timeSlots
  }
}
