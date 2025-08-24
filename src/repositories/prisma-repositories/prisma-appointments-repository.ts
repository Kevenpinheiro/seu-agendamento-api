import { Appointment, Prisma } from '@prisma/client'
import { prisma } from '@/database/prisma'
import { AppointmentRepository } from '../appointments-repository'

export class PrismaAppointmentRepository implements AppointmentRepository {
  async findById(id: string) {
    return await prisma.appointment.findFirst({
      where: {
        id,
      },
    })
  }

  async findMany(
    establishmentId: string,
  ): Promise<Appointment[]> {
    const appointment = await prisma.appointment.findMany({
      where: {
        establishmentId,
      },
    })

    return appointment
  }

  async create(
    data: Prisma.AppointmentUncheckedCreateInput,
  ): Promise<Appointment> {
    const appointment = await prisma.appointment.create({
      data,
    })

    return appointment
  }

  async delete(appointment: Appointment): Promise<void> {
    await prisma.appointment.delete({
      where: {
        id: appointment.id.toString(),
      },
    })
  }
}
