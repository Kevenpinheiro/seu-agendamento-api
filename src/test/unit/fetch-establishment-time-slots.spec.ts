import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEstablishmentRepository } from '../repositories/in-memory/in-memory-establishment-repository'
import { FetchEstablishmentTimeSlotsUseCase } from '@/use-cases/fetch-establishment-time-slots'
import { InMemoryTimeSlotsRepository } from '../repositories/in-memory/in-memory-establishment-time-slots-repository'

let establishmentRepository: InMemoryEstablishmentRepository
let timeSlotsRepository: InMemoryTimeSlotsRepository

let sut: FetchEstablishmentTimeSlotsUseCase

describe('Fetch EstablishmentAvailableTimes Use Case', () => {
  beforeEach(async () => {
    establishmentRepository = new InMemoryEstablishmentRepository()
    timeSlotsRepository = new InMemoryTimeSlotsRepository()

    sut = new FetchEstablishmentTimeSlotsUseCase(timeSlotsRepository)
  })

  it('should be able to fetch available times', async () => {
    const establishment = await establishmentRepository.create({
      managerId: 'user-01',
      name: 'Estabelecimento Teste',
      description: 'Establishment 01',
    })

    const establishmentId = establishment.id

    timeSlotsRepository.items.push({
      id: 'id-1',
      establishmentId,
      dayOfWeek: 4,
      startTime: '08:00',
      endTime: '11:30',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    timeSlotsRepository.items.push({
      id: 'id-2',
      establishmentId,
      dayOfWeek: 4,
      startTime: '09:00',
      endTime: '12:30',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const { timeSlots } = await sut.execute({
      establishmentId,
    })

    expect(timeSlots).toHaveLength(2)
  })
})
