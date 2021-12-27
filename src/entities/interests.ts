import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import * as Entities from './index'

@Index(['id'], { unique: true })
@Entity('interests', { schema: 'public' })
export class Interests extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id!: string

  @Column('uuid', { name: 'lead_id' })
    leadId!: string

  @Column('varchar', { name: 'message' })
    message!: string

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

  @ManyToOne(() => Entities.Leads, (leads) => leads.interests)
  @JoinColumn({ name: 'lead_id', referencedColumnName: 'id' })
    lead: Entities.Leads
}
