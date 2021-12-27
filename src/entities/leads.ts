import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import * as Entities from './index'

@Index(['id'], { unique: true })
@Unique('email_phone_unique_constraint', ['email', 'phone'])
@Entity('leads', { schema: 'public' })
export class Leads extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id!: string

  @Column('varchar', { name: 'email' })
    email!: string

  @Column('varchar', { name: 'phone' })
    phone!: string

  @Column('varchar', { name: 'first_name' })
    firstName!: string

  @Column('varchar', { name: 'last_name' })
    lastName!: string

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: () => 'now()',
  })
  readonly createdAt!: string | Date

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
    default: () => 'now()',
  })
  readonly updatedAt!: string | Date

  @OneToMany(() => Entities.Interests, (interest) => interest.lead)
    interests!: Array<Entities.Interests>
}
