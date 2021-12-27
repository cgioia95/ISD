import { APIGatewayProxyResult } from 'aws-lambda'
import { EntityColumnNotFound, EntityNotFoundError, QueryFailedError } from 'typeorm'
import {
  StatusCodes,
} from 'http-status-codes'

import joi from 'joi'

export type HTTPError = {
    statusCode: number,
    message: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsePostgresError = (error: any):HTTPError => {
  let statusCode: number
  let message = ''

  const badRequestCodes = ['23502', '23503', '23505', '23514']

  if (badRequestCodes.includes(error.code)) {
    statusCode = StatusCodes.BAD_REQUEST
  }

  message = error.message

  return {
    statusCode,
    message,
  }
}

export default (error: unknown): APIGatewayProxyResult => {
  let statusCode: StatusCodes
  let message: string

  if (error instanceof EntityNotFoundError) {
    statusCode = StatusCodes.NOT_FOUND
    message = 'Entity Not Found'
  } else if (error instanceof EntityColumnNotFound) {
    statusCode = StatusCodes.BAD_REQUEST
    message = 'Bad Input Paramaters'
  } else if (error instanceof QueryFailedError) {
    ({ statusCode, message } = parsePostgresError(error))
  } else if (error instanceof joi.ValidationError) {
    statusCode = StatusCodes.BAD_REQUEST
    message = error.annotate(true)
  } else {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    message = 'Internal Server Error'
  }

  return {
    statusCode,
    body: JSON.stringify({ message }),
  }
}
