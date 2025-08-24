import { app } from '@/app'
import { prisma } from '@/database/prisma'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

describe('Fetch establishment time slots (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch establishment time slots ', async () => {
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
        description: 'Zeca Barber'
      },
    })

    await prisma.timeSlot.createMany({
      data: [
        {
          establishmentId: establishment.id,
          dayOfWeek: 4,
          startTime: '08:00',
          endTime: '11:30',
        },
        {
          establishmentId: establishment.id,
          dayOfWeek: 5,
          startTime: '09:00',
          endTime: '12:30',
        },
      ],
    })

    const response = await request(app.server)
      .get(`/establishment/${establishment.id}/time-slots`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
