import { SendAuthLinkUseCase } from '@/use-cases/send-auth-link'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryAuthLinkRepository } from '../repositories/in-memory/in-memory-auth-link-repository'
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user-repository'

let userRepository: InMemoryUserRepository
let authLinkRepository: InMemoryAuthLinkRepository
let sut: SendAuthLinkUseCase

describe('send auth link use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    authLinkRepository = new InMemoryAuthLinkRepository()

    sut = new SendAuthLinkUseCase(userRepository, authLinkRepository)
  })

  it.skip('should be able to send an auth link to an existing user', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '11922222222',
    })

    userRepository.items.push(user)

    const result = await sut.execute({
      email: user.email,
    })

    expect(result).toEqual(
      expect.objectContaining({
        authLink: expect.stringContaining('/auth-links/authenticate?code='),
      }),
    )
  })
})
