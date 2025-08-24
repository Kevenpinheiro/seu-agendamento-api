import { Prisma, Appointment } from '@prisma/client'

export interface AppointmentRepository {
  findById(id: string): Promise<Appointment | null>
  findMany(establishmentId: string): Promise<Appointment[]>
  delete(appointmentId: Appointment): Promise<void>

  create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>
}
