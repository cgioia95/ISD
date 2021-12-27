import * as Entities from '../entities/index'
import { Fixture } from './types'

export const firstLead: Fixture<Entities.Leads> = {
  id: 'f2c427fd-d501-4d02-a70e-e7d7e38892c9',
  email: 'christian.gioia@gmail.com',
  phone: '+491739341281',
  firstName: 'Christian',
  lastName: 'Gioia',
  createdAt: new Date(),
  updatedAt: new Date(),
  interests: [],
}

const latestDate = new Date()
latestDate.setHours(latestDate.getHours() + 1)

export const secondLead: Fixture<Entities.Leads> = {
  id: 'f7cdbdc8-91da-4bda-9e02-d6936eff2abf',
  email: 'john.hanson@gmail.com',
  phone: '+491739341282',
  firstName: 'John',
  lastName: 'Hanson',
  createdAt: latestDate,
  updatedAt: latestDate,
  interests: [],
}

export const leads = [firstLead, secondLead]
