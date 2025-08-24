import { AppointmentRepository } from '@/repositories/appointments-repository'
import { Appointment } from '@prisma/client'
import { EstablishmentRepository } from '@/repositories/establishment-repository'
import { EstablishmentNotFoundError } from './errors/establishment-not-found'
import { UserRepository } from '@/repositories/user-repository'
import { UserNotFoundError } from './errors/user-not-found-error'
import { TimeSlotsRepository } from '@/repositories/establishment-time-slots-repository'


interface AppointmentRequest {
  userId: string
  establishmentId: string
  timeSlotId: string
}

interface AppointmentResponse {
  appointment: Appointment
}

export class AppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private establishmentRepository: EstablishmentRepository,
    private usersRepository: UserRepository,
    private timeSlotsRepository: TimeSlotsRepository,
  ) {}

  async execute({
    userId,
    establishmentId,
    timeSlotId,
  }: AppointmentRequest): Promise<AppointmentResponse> {
    const establishment =
      await this.establishmentRepository.findById(establishmentId)

    if (!establishment) {
      throw new EstablishmentNotFoundError()
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const availableTimeSlot = this.timeSlotsRepository.findById(timeSlotId)

    if (!availableTimeSlot) {
      throw new Error('Escolha um horário disponível')
    }

    const appointment = await this.appointmentRepository.create({
      userId,
      establishmentId,
      timeSlotId,
    })

    return {
      appointment,
    }
  }
}
