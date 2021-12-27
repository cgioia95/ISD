import { getConnection } from 'typeorm'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { StatusCodes } from 'http-status-codes'
import { handler } from '../../../src/functions/Interests/manualCreate'
import { connectToDatabase } from '../../../src/database'
import { InterestCreate } from '../../../src/functions/Interests/types'
import { firstLead } from '../../../src/fixtures/leads'
import * as Entities from '../../../src/entities/index'

describe('Unit test for app Interests/manualCreate handler', () => {
  let id = ''
  beforeAll(async () => {
    await connectToDatabase()
  })

  afterAll(async () => {
    await Entities.Interests.delete(id)
    await getConnection().close()
  })

  it('should successfully create an interest and associate with an existing lead', async () => {
    const body: InterestCreate = {
      leadId: firstLead.id,
      message: 'Produxt XYZ',
    }

    const event = {
      body: JSON.stringify(body),
    } as APIGatewayProxyEvent

    const result = await handler(event)

    const createdInterest = JSON.parse(result.body)
    const {
      message, leadId,
    } = createdInterest

    id = createdInterest.id

    expect(result.statusCode).toEqual(StatusCodes.CREATED)
    expect(message).toEqual(body.message)
    expect(leadId).toEqual(body.leadId)
  })

  it('should return not found error when createing a interest on a non-existent lead', async () => {
    const body: InterestCreate = {
      leadId: '9e8090a1-db90-4d3d-bab9-c1db18f616e6',
      message: 'Produxt XYZ',
    }

    const event = {
      body: JSON.stringify(body),
    } as APIGatewayProxyEvent

    const result = await handler(event)

    expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND)
  })

  it('should return a bad request error for an empty string message', async () => {
    const body: InterestCreate = {
      leadId: firstLead.id,
      message: '',
    }

    const event = {
      body: JSON.stringify(body),
    } as APIGatewayProxyEvent

    const result = await handler(event)
    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
})
