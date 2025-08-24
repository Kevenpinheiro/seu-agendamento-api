import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryEstablishmentRepository } from '../repositories/in-memory/in-memory-establishment-repository'
import { EstablishmentAlreadyExistsError } from '@/use-cases/errors/establishment-already-exists'
import { CreateEstablishmentUseCase } from '@/use-cases/create-establishment'

let establishmentsRepository: InMemoryEstablishmentRepository
let sut: CreateEstablishmentUseCase

describe('Create establishment use case', () => {
  beforeEach(() => {
    establishmentsRepository = new InMemoryEstablishmentRepository()

    sut = new CreateEstablishmentUseCase(establishmentsRepository)
  })

  it('should be able to create establishment', async () => {
    const { establishment } = await sut.execute({
      managerId: 'user-01',
      name: 'Zeca Barber',
      description: 'Esse é um estabelecimento de teste',
    })

    expect(establishment.id).toEqual(expect.any(String))
  })
})
