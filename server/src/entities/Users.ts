import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import { Review } from './Review'
import { Orders } from './Orders';
import { Cart } from './Cart';

enum Role {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!:Role;

  @Column({ type: 'varchar', nullable: false })
  username!: string;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'varchar'})
  token!: string;

  //can be ignored, since no access intended
  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[]

  @OneToMany(() => Orders, (order) => order.user)
  orders!: Orders[]

  @OneToOne(() => Cart)
    @JoinColumn({name : 'cart_id'})
    cart!: Cart
}
