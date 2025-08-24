import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteAppointmentUseCase } from '@/use-cases/delete-appointment'
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository'

let appointmentsRepository: InMemoryAppointmentRepository
let sut: DeleteAppointmentUseCase

describe('Delete appointments use case', () => {
  beforeEach(async () => {
    appointmentsRepository = new InMemoryAppointmentRepository()

    sut = new DeleteAppointmentUseCase(appointmentsRepository)
  })

  it('should be able to delete appointment', async () => {
    const appointment = await appointmentsRepository.create({
      establishmentId: 'establishment-01',
      userId: 'user-01',
      timeSlotId: '428042048',
    })

    await sut.execute({
      appointmentId: appointment.id,
    })

    expect(appointmentsRepository.items).toHaveLength(0)
  })
})
