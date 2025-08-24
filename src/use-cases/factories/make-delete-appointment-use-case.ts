import { PrismaAppointmentRepository } from '@/repositories/prisma-repositories/prisma-appointments-repository'
import { DeleteAppointmentUseCase } from '../delete-appointment'

export function makeDeleteAppointmentUseCase() {
  const appointmentsRepository = new PrismaAppointmentRepository()
  const useCase = new DeleteAppointmentUseCase(appointmentsRepository)

  return useCase
}
