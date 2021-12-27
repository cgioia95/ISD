import { getConnection } from 'typeorm'
import { StatusCodes } from 'http-status-codes'
import { handler } from '../../../src/functions/Leads/get'
import { connectToDatabase } from '../../../src/database'

import { leads as leadsFixture } from '../../../src/fixtures/leads'

describe('Unit test for Leads/Get handler', () => {
  beforeAll(async () => {
    await connectToDatabase()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  it('should successfully retrieve and leads in order of most recently created', async () => {
    const result = await handler()
    const parsedResult = JSON.parse(result.body)

    const { leads } = parsedResult

    expect(result.statusCode).toEqual(StatusCodes.OK)
    expect(leads[0].firstName).toEqual(leadsFixture[1].firstName)
  })
})
