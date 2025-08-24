import { app } from '@/app'

import request from 'supertest'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'

import { prisma } from '@/database/prisma'

describe('Create Appointment (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create appointment', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        phone: '11966666666',
      },
    })

    const userId = user.id

    const establishment = await prisma.establishment.create({
      data: {
        managerId: userId,
        name: 'John Doe',
        description: 'Barbearia do João',
      },
    })

    const establishmentId = establishment.id

    const establishmentTimeSlots = await prisma.timeSlot.create({
      data: {
        establishmentId,
        dayOfWeek: 5,
        startTime: '09:00',
        endTime: '11:30',
      },
    })

    const timeSlotId = establishmentTimeSlots.id

    const response = await request(app.server)
    .post(`/establishment/${userId}/appointments/${establishmentId}`)
    .send({
      timeSlotId,
    })
  
    expect(response.statusCode).toEqual(201)
  })
})
