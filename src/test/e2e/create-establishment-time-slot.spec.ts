import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import { prisma } from '@/database/prisma'

describe('Create establishment time slots (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should be able to create time slots for establishment', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        phone: '+5511960443333',
        email: 'john@doe.com',
      },
    })

    const establishment = await prisma.establishment.create({
      data: {
        managerId: user.id,
        name: 'Estabelecimento Teste',
        description: 'Establishment 01',
      },
    })

    const establishmentId = establishment.id

    const response = await request(app.server)
      .post(`/establishment/${establishmentId}/time-slots`)
      .send({
        dayOfWeek: 5,
        startTime: '09:00',
        endTime: '11:30',
      })

    expect(response.statusCode).toEqual(201)
  })
})
