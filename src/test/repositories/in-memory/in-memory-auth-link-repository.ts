import { AuthLink, Prisma } from '@prisma/client'
import { AuthLinkRepository } from '@/repositories/auth-link-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAuthLinkRepository implements AuthLinkRepository {
  public items: AuthLink[] = []

  async findByCode(code: string) {
    const foundCode = this.items.find((item) => item.code === code)

    if (!foundCode) {
      return null
    }

    return foundCode
  }

  async createAuthLink(data: Prisma.AuthLinkUncheckedCreateInput) {
    const authLink = {
      id: data.id ?? randomUUID(),
      userId: data.userId,
      code: data.code ?? randomUUID(),
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    }

    this.items.push(authLink)

    return authLink
  }

  async deleteCode(code: string) {
    const itemIndex = this.items.findIndex((item) => item.code === code)

    this.items.splice(itemIndex, 1)
  }
}
