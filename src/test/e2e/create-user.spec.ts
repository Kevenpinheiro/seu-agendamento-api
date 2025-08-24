import { app } from '@/app'
import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register user (e2e)', () => {
  beforeEach(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '11922222222',
    })

    expect(response.statusCode).toEqual(201)
  })
})