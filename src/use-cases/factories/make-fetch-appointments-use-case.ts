import { PrismaAppointmentRepository } from '@/repositories/prisma-repositories/prisma-appointments-repository'
import { FetchAppointmentsUseCase } from '../fetch-appointments'

export function makeFetchAppointmentsUseCase() {
  const appointmentsRepository = new PrismaAppointmentRepository()
  const useCase = new FetchAppointmentsUseCase(appointmentsRepository)

  return useCase
}
