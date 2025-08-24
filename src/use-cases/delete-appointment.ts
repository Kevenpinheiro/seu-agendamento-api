import { AppointmentRepository } from '@/repositories/appointments-repository'

interface DeleteAppointmentRequest {
  appointmentId: string
}

export class DeleteAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentRepository) {}

  async execute({ appointmentId }: DeleteAppointmentRequest) {

    const appointment = await this.appointmentsRepository.findById(appointmentId)

    if (!appointment) {
      throw new Error('Não há agendamentos.')
    }

    await this.appointmentsRepository.delete(appointment)
  }
}
