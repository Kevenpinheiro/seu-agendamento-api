import { app } from '@/app'
import { prisma } from '@/database/prisma'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

describe('Fetch Appointments (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch appointments', async () => {
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
        name: 'Zeca Barber',
        description: 'Esse é um estabelecimento de teste',
      },
    })

    const establishmentId = establishment.id

    const establishmentTimeSlots1 = await prisma.timeSlot.create({
      data: {
          establishmentId: establishment.id,
          dayOfWeek: 4,
          startTime: '08:00',
          endTime: '11:30',
        }
    })

    const establishmentTimeSlots2 = await prisma.timeSlot.create({
      data: {
          establishmentId,
          dayOfWeek: 4,
          startTime: '06:00',
          endTime: '12:30',
        }
    })

    

    await prisma.appointment.create({
      data: {
          establishmentId,
          userId,
          timeSlotId: establishmentTimeSlots1.id,
        }
    })

    await prisma.appointment.create({
      data: {
          establishmentId: establishment.id,
          userId,
          timeSlotId: establishmentTimeSlots2.id,
        }
    })

    const response = await request(app.server).get(`/establishment/${establishmentId}/appointments`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.appointments).toEqual([
      expect.objectContaining({
        establishmentId: establishment.id,
      }),
      expect.objectContaining({
        establishmentId: establishment.id,
      }),
    ])
  })
})
