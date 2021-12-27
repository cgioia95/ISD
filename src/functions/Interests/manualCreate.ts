import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda'
import joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { getOrCreateConnection } from '../../database'
import * as Entities from '../../entities/index'
import { InterestCreate } from './types'
import handleError from '../../middleware/error-handler'

const schema = joi.object({
  leadId: joi.string().uuid(),
  message: joi.string().min(1).max(100).required(),
})

// Handler for scenario where a user creates their own lead and interest in one form
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const conn = await getOrCreateConnection()
    const body: InterestCreate = JSON.parse(event.body)

    const { error } = schema.validate(body)

    if (error) {
      throw error
    }

    const { leadId } = body

    let interest: Entities.Interests

    await conn.manager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.findOneOrFail(Entities.Leads, leadId)
      const interestRepo = transactionalEntityManager.getRepository(Entities.Interests)
      interest = await interestRepo.save(interestRepo.create(body))
    })

    return ({
      statusCode: StatusCodes.CREATED,
      body: JSON.stringify(interest),
    })
  } catch (e) {
    return handleError(e)
  }
}
