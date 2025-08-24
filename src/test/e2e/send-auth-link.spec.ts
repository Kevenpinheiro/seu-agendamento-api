import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Send auth link (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  // TODO: Fix this test
  it.only('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '11922222222',
    })

    const response = await request(app.server).post('/authenticate').send({
      email: 'johndoe@mail.com',
    })

    expect(response.statusCode).toEqual(200)
  })
})
