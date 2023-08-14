import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { OrderItem } from './Order_Items';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column()
  total_amount!: number;

  @Column()
  payment_status!: string;

  @ManyToOne(() => Users, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems!: OrderItem[];

  

}
