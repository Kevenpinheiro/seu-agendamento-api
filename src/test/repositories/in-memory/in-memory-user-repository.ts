import { User, Prisma, Role } from '@prisma/client'
import { UserRepository } from '@/repositories/user-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = this.items.find((item) => item.phone === phone)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role ?? Role.CLIENT,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}
