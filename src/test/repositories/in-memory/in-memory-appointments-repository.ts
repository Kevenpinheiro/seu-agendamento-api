import { AppointmentRepository } from '@/repositories/appointments-repository'
import { Appointment, Prisma, Status } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = []

  async findById(id: string) {
    const appointment = this.items.find((item) => item.id === id)

    if (!appointment) {
      return null
    }

    return appointment
  }

  async findMany(establishmentId: string): Promise<Appointment[]> {
    return this.items.filter((item) => item.establishmentId === establishmentId)
  }

  async delete(appointmentId: Appointment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id !== appointmentId.id)

    this.items.splice(itemIndex, 1)
  }

  async create(data: Prisma.AppointmentUncheckedCreateInput) {
    const appointment = {
      id: data.id ?? randomUUID(),
      userId: data.userId,
      establishmentId: data.establishmentId,
      timeSlotId: data.timeSlotId,
      status: Status.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(appointment)

    return appointment
  }
}
