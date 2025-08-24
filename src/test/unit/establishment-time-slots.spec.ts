import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEstablishmentRepository } from '../repositories/in-memory/in-memory-establishment-repository'
import { InMemoryTimeSlotsRepository } from '../repositories/in-memory/in-memory-establishment-time-slots-repository'
import { CreateTimeSlotsUseCase } from '@/use-cases/create-time-slots'
import { TimeSlotAlreadyExistsError } from '@/use-cases/errors/time-slot-already-exists'

let establishmentTimeSlotsRepository: InMemoryTimeSlotsRepository
let establishmentRepository: InMemoryEstablishmentRepository

let sut: CreateTimeSlotsUseCase

describe('Establishment time slots Use Case', () => {
  beforeEach(async () => {
    establishmentTimeSlotsRepository = new InMemoryTimeSlotsRepository()
    establishmentRepository = new InMemoryEstablishmentRepository()

    sut = new CreateTimeSlotsUseCase(
      establishmentRepository,
      establishmentTimeSlotsRepository,
    )
  })

  it('should be able to create time slots for establishment', async () => {
    const establishment = await establishmentRepository.create({
      managerId: 'user-01',
      name: 'Estabelecimento Teste',
      description: 'Establishment de beleza',
    })

    const today = new Date().getDay() // 0,1,2,3,4,5,6,7

    const { timeSlot } = await sut.execute({
      establishmentId: establishment.id,
      dayOfWeek: today,
      startTime: '09:00',
      endTime: '11:30',
    })

    expect(timeSlot.id).toEqual(expect.any(String))
  })

  it('should not be able to create with same time', async () => {
    const establishment = await establishmentRepository.create({
      managerId: 'user-01',
      name: 'Estabelecimento Teste',
      description: 'Establishment 01',
    })

    const today = new Date().getDay() // 0,1,2,3,4,5,6,7

    const startTime = '09:00'
    const endTime = '10:00'

    const result = await sut.execute({
      establishmentId: establishment.id,
      dayOfWeek: today,
      startTime,
      endTime,
    })

    console.log(result)

    await expect(() =>
      sut.execute({
        establishmentId: establishment.id,
        dayOfWeek: today,
        startTime,
        endTime,
      }),
    ).rejects.toBeInstanceOf(TimeSlotAlreadyExistsError)
  })
})
