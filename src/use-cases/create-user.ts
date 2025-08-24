import { User } from '@prisma/client'

import { UserRepository } from '@/repositories/user-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists'

export interface CreateUserUseCaseRequest {
  name: string
  email: string
  phone: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    phone,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userEmail = await this.userRepository.findByEmail(email)
    const userPhone = await this.userRepository.findByPhone(phone)

    if (userEmail || userPhone) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      email,
      phone,
    })

    console.log(user)

    return { user }
  }
}
