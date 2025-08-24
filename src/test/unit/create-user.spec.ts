import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'

import { CreateUserUseCase } from '@/use-cases/create-user'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create user use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()

    sut = new CreateUserUseCase(userRepository)
  })

  it('should be able to create user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '11971602004',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create with same email and some phone', async () => {
    const email = 'johndoe@mais.com'
    const phone = '11971602004'

    await sut.execute({
      name: 'John Doe',
      email,
      phone,
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        phone,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
