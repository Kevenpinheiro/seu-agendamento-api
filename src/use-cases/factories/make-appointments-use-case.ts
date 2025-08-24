import { PrismaAppointmentRepository } from '@/repositories/prisma-repositories/prisma-appointments-repository'
import { AppointmentUseCase } from '../create-appointments'
import { PrismaEstablishmentRepository } from '@/repositories/prisma-repositories/prisma-establishment-repository'
import { PrismaEstablishmentTimeSlotsRepository } from '@/repositories/prisma-repositories/prisma-establishment-time-slot-repository'
import { PrismaUserRepository } from '@/repositories/prisma-repositories/prisma-user-repository'

export function makeAppointmentsUseCase() {
  const prismaAppointmentRepository = new PrismaAppointmentRepository()
  const prismaEstablishmentRepository = new PrismaEstablishmentRepository()
  const prismaTimeSlotsRepository = new PrismaEstablishmentTimeSlotsRepository()
  const prismaUsersRepository = new PrismaUserRepository()

  const useCase = new AppointmentUseCase(
    prismaAppointmentRepository,
    prismaEstablishmentRepository,
    prismaUsersRepository,
    prismaTimeSlotsRepository,
  )

  return useCase
}
