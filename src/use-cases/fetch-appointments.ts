import { Appointment } from '@prisma/client'
import { AppointmentRepository } from '@/repositories/appointments-repository'

interface FetchAppointmentsUseCaseRequest {
  establishmentId: string
}

interface FetchAppointmentsUseCaseResponse {
  appointments: Appointment[]
}

export class FetchAppointmentsUseCase {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({
    establishmentId,
  }: FetchAppointmentsUseCaseRequest): Promise<FetchAppointmentsUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findMany(establishmentId)

    return {
      appointments,
    }
  }
}
