import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'

import { StatusCodes } from 'http-status-codes'
import joi from 'joi'
import { getOrCreateConnection } from '../../database'
import * as Entities from '../../entities/index'
import { ManualLeadCreate } from './types'
import handleError from '../../middleware/error-handler'
import * as Constants from '../../utils/constants'

const schema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }),
  phone: joi.string().regex(Constants.GERMAN_PHONE_REGEX),
  firstName: joi.string().alphanum().min(2).max(50)
    .required(),
  lastName: joi.string().alphanum().min(2).max(50)
    .required(),
})

// Handler for scenario where a user creates their own lead and interest in one form
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const conn = await getOrCreateConnection()

    const body: ManualLeadCreate = JSON.parse(event.body)

    const { ...leadData } = body

    const { error } = schema.validate(body)

    if (error) {
      throw error
    }

    let lead: Entities.Leads

    await conn.manager.transaction(async (transactionalEntityManager) => {
      const leadRepo = transactionalEntityManager.getRepository(Entities.Leads)
      lead = await leadRepo.save(leadRepo.create(leadData))
    })

    return ({
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(lead),
    })
  } catch (e) {
    return handleError(e)
  }
}
