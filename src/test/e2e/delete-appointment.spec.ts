import { app } from '@/app'
import { prisma } from '@/database/prisma'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

describe('Delete Appointments (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete appointments', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        phone: '1196666666',
      }
    })

    const establishment = await prisma.establishment.create({
      data: {
        managerId: user.id,
        name: 'John Doe',
        description: 'Esse é um estabelecimento de teste',
      },
    })

    const establishmentId = establishment.id

    const establishmentTimeSlots = await prisma.timeSlot.create({
      data: {
          establishmentId: establishment.id,
          dayOfWeek: 4,
          startTime: '08:00',
          endTime: '11:30',
        }
    })

    const appointment = await prisma.appointment.create({
      data: {
        establishmentId: establishment.id,
        userId: user.id,
        timeSlotId: establishmentTimeSlots.id,
      },
    })

    const response = await request(app.server)
      .delete(`/establishment/${appointment.id}/appointments`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
