import { app } from '@/app'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { prisma } from '@/database/prisma'

describe('Create establishment (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create establishment', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        phone: '+5511960443333',
        email: 'john@doe.com',
      },
    })

    const response = await request(app.server).post(`/establishment`).send({
      managerId: user.id,
      name: 'Estabelecimento Teste',
      description: 'Establishment 01',
    })

    expect(response.statusCode).toEqual(201)
  })
})
