import { define } from 'typeorm-seeding'
import * as faker from 'faker'
import * as Entities from '../entities/leads'
// user.factory.ts
define(Entities.Leads, () => {
  const gender = faker.random.number(1)

  const user = new Entities.Leads()
  user.firstName = faker.name.firstName(gender)
  user.lastName = faker.name.lastName(gender)
  user.email = faker.internet.email(user.firstName)
  user.phone = faker.phone.phoneNumberFormat()
  return user
})
