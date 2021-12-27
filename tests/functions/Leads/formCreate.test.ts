import { getConnection } from 'typeorm'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { StatusCodes } from 'http-status-codes'
import { handler } from '../../../src/functions/Leads/formCreate'
import { connectToDatabase } from '../../../src/database'
import { FormLeadCreate } from '../../../src/functions/Leads/types'
import * as Entitiies from '../../../src/entities/index'

describe('Unit test for app Leads/formCreate handler', () => {
  let id = ''

  beforeAll(async () => {
    await connectToDatabase()
  })

  afterAll(async () => {
    await Entitiies.Leads.delete(id)
    await getConnection().close()
  })

  it('should successfully create a lead and associated interest', async () => {
    const body: FormLeadCreate = {
      email: 'Jake.Gittes@gmail.com',
      phone: '+491739341284',
      firstName: 'Jake',
      lastName: 'Gittes',
      message: 'Produxt XYZ',
    }

    const event = {
      body: JSON.stringify(body),
    } as APIGatewayProxyEvent

    const result = await handler(event)

    const createdLead = JSON.parse(result.body)
    const {
      email, phone, firstName, lastName,
    } = createdLead

    id = createdLead.id

    const interest = await Entitiies.Interests.findOne({
      where: {
        leadId: id,
      },
    })

    expect(result.statusCode).toEqual(StatusCodes.CREATED)
    expect(interest.message).toEqual(body.message)
    expect(email).toEqual(body.email)
    expect(phone).toEqual(body.phone)
    expect(firstName).toEqual(body.firstName)
    expect(lastName).toEqual(body.lastName)
  })

  it('should return bad request error when violating unique constrain of email + phone', async () => {
    const body: FormLeadCreate = {
      email: 'Jake.Gittes@gmail.com',
      phone: '+491739341284',
      firstName: 'Raymond',
      lastName: 'Chandler',
      message: 'Produxt ZYX!',
    }

    const event = {
      body: JSON.stringify(body),
    } as APIGatewayProxyEvent

    const result = await handler(event)

    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })

  it('should return a bad request error for non-german phone number', async () => {
    const body: FormLeadCreate = {
      email: 'Jake.Gittes@gmail.com',
      phone: '0438186628',
      firstName: 'Jake',
      lastName: 'Gittes',
      message: 'The law!',
    }

    const event = {
      body: JSON.stringify(body),
    } as APIGatewayProxyEvent

    const result = await handler(event)
    expect(result.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
})
