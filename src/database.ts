import { Connection, createConnection, getConnection } from 'typeorm'
import * as Entities from './entities'

export const connectToDatabase = async (
  host = 'localhost',
  database = 'isd',
  username = 'postgres',
  password = 'postgres',
  port = 5432,
): Promise<Connection> => createConnection({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_WRITER_HOSTNAME || host,
  database: process.env.DB_NAME || database,
  username: process.env.DB_WRITER_USERNAME || username,
  password: process.env.DB_WRITER_PASSWORD || password,
  port: Number(process.env.DB_PORT) || port,
  entities: [
    Entities.Leads,
    Entities.Interests,
  ],
  logging: false,
})

export const getOrCreateConnection = async () => {
  let connection: Connection
  try {
    connection = getConnection()
  } catch (e) {
    connection = await connectToDatabase()
  }

  return connection
}
