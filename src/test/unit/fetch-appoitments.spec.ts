import { FetchAppointmentsUseCase } from '@/use-cases/fetch-appointments'
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository'
import { beforeEach, describe, expect, it } from 'vitest'

let appointmentRepository: InMemoryAppointmentRepository
let sut: FetchAppointmentsUseCase

describe('Fetch Appointments Use Case', () => {
  beforeEach(async () => {
    appointmentRepository = new InMemoryAppointmentRepository()

    sut = new FetchAppointmentsUseCase(appointmentRepository)
  })

  it('should be able to fetch appointments', async () => {
    await appointmentRepository.create({
      establishmentId: 'establishment-01',
      userId: 'user-01',
      timeSlotId: '424924892',
    })

    await appointmentRepository.create({
      establishmentId: 'establishment-01',
      userId: 'user-02',
      timeSlotId: '424444444',
    })

    const { appointments } = await sut.execute({
      establishmentId: 'establishment-01',
    })

    expect(appointments).toHaveLength(2)
    expect(appointments).toEqual([
      expect.objectContaining({ establishmentId: 'establishment-01' }),
      expect.objectContaining({ establishmentId: 'establishment-01' }),
    ])
  })
})
