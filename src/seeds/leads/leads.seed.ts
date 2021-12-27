import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import * as Entities from '../../entities/leads'
import { leads } from '../../fixtures/leads'

// create-pets.seed.ts
export default class CreateLeads implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.manager.insert(Entities.Leads, leads[0])
    await connection.manager.insert(Entities.Leads, leads[1])
  }
}
