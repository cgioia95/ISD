import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { getOrCreateConnection } from '../../database'
import * as Entities from '../../entities/index'
import { FormLeadCreate } from './types'
import { InterestCreate } from '../Interests/types'
import handleError from '../../middleware/error-handler'
import * as Constants from '../../utils/constants'

const schema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }),
  phone: joi.string().regex(Constants.GERMAN_PHONE_REGEX),
  firstName: joi.string().alphanum().min(2).max(50)
    .required(),
  lastName: joi.string().alphanum().min(2).max(50)
    .required(),
  message: joi.string().min(1).max(100).required(),
})

// Handler for scenario where a user creates their own lead and interest in one form
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const conn = await getOrCreateConnection()
    const body: FormLeadCreate = JSON.parse(event.body)

    const { error } = schema.validate(body)

    if (error) {
      throw error
    }

    const { message, ...leadData } = body

    let lead: Entities.Leads

    await conn.manager.transaction(async (transactionalEntityManager) => {
      const leadRepo = transactionalEntityManager.getRepository(Entities.Leads)
      lead = await leadRepo.save(leadRepo.create(leadData))
      const interest: InterestCreate = { message, leadId: lead.id }
      await transactionalEntityManager.insert(Entities.Interests, interest)
    })

    return ({
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(lead),
    })
  } catch (e) {
    return handleError(e)
  }
}
