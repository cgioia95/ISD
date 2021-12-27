import { APIGatewayProxyResult } from 'aws-lambda'
import { StatusCodes } from 'http-status-codes'

import { getOrCreateConnection } from '../../database'
import * as Entities from '../../entities/index'
import handleError from '../../middleware/error-handler'

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const conn = await getOrCreateConnection()

    const leads = await conn.createQueryBuilder(Entities.Leads, 'leads')
      .orderBy('leads.created_at', 'DESC')
      .getMany()

    return ({
      statusCode: StatusCodes.OK,
      body: JSON.stringify({
        leads,
      }),
    })
  } catch (e) {
    return handleError(e)
  }
}
