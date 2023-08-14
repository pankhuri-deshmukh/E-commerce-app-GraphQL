import { Entity, BaseEntity, PrimaryColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { Users } from './Users';

@Entity()
export class Password_Reset extends BaseEntity {
  @PrimaryColumn()
  reset_token!: string;

  @OneToOne(() => Users)
    @JoinColumn({name : 'user_id' })
    user! : Users
}
