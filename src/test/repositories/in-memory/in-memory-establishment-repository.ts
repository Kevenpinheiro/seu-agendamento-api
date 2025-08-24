import { Establishment, Prisma } from '@prisma/client'
import { EstablishmentRepository } from '@/repositories/establishment-repository'
import { randomUUID } from 'node:crypto'
import { EstablishmentNotFoundError } from '@/use-cases/errors/establishment-not-found'

export class InMemoryEstablishmentRepository
  implements EstablishmentRepository
{
  public items: Establishment[] = []

  async findById(id: string): Promise<Establishment | null> {
    const establishment = this.items.find((item) => item.id === id)

    if (!establishment) {
      throw new EstablishmentNotFoundError()
    }

    return establishment
  }

  async create(
    data: Prisma.EstablishmentUncheckedCreateInput,
  ): Promise<Establishment> {
    const establishment = {
      id: data.id ?? randomUUID(),
      managerId: data.managerId,
      name: data.name,
      description: data.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(establishment)

    return establishment
  }
}
