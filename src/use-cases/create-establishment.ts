import { Establishment } from '@prisma/client'
import { EstablishmentRepository } from '@/repositories/establishment-repository'

export interface CreateEstablishmentUseCaseRequest {
  managerId: string
  name: string
  description: string 
}

export interface CreateEstablishmentUseCaseResponse {
  establishment:               Establishment    ,               
}

export class CreateEstablishmentUseCase {
  constructor( private establishmentsRepository: EstablishmentRepository) {}

  async execute({
    managerId,
    name,
    description,
  }: CreateEstablishmentUseCaseRequest): Promise<CreateEstablishmentUseCaseResponse> {
    

    const establishment = await this.establishmentsRepository.create({
      managerId,
      name,
      description,
    })

    return {
      establishment
    }
  }
}
