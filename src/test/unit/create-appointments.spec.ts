import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAppointmentRepository } from '../repositories/in-memory/in-memory-appointments-repository'
import { AppointmentUseCase } from '@/use-cases/create-appointments'
import { InMemoryEstablishmentRepository } from '../repositories/in-memory/in-memory-establishment-repository'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'
import { InMemoryTimeSlotsRepository } from '../repositories/in-memory/in-memory-establishment-time-slots-repository'
import { randomUUID } from 'crypto'

let establishmentRepository: InMemoryEstablishmentRepository
let usersRepository: InMemoryUserRepository
let timeSlotsRepository: InMemoryTimeSlotsRepository
let appointmentsRepository: InMemoryAppointmentRepository

let sut: AppointmentUseCase

describe('Create appointments Use Case', () => {
  beforeEach(async () => {
    appointmentsRepository = new InMemoryAppointmentRepository()
    usersRepository = new InMemoryUserRepository()
    establishmentRepository = new InMemoryEstablishmentRepository()
    timeSlotsRepository = new InMemoryTimeSlotsRepository()
    

    sut = new AppointmentUseCase(
      appointmentsRepository,
      establishmentRepository,
      usersRepository,
      timeSlotsRepository,
    )
  })

  it('should be able to create appointment', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@mais.com',
      phone: '11971602004',
    })

    const establishment = await establishmentRepository.create({
      managerId: user.id,
      name: 'Zeca Barber',
      description: 'Esse é um estabelecimento de teste',
    })

    const { appointment } = await sut.execute({
      establishmentId: establishment.id,
      userId: user.id,
      timeSlotId: randomUUID(),
    })

    console.log(appointment)

    expect(appointment.id).toEqual(expect.any(String))
  })
})
