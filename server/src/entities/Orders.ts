import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BaseEntity } from 'typeorm';
import { Users } from './Users';
import { OrderItem } from './Order_Items';

enum PaymentStatus {
  SUCCESSFUL = "successful",
  FAILED = "failed",
}

@Entity()
export class Orders extends BaseEntity{
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column({type: 'decimal', precision: 10, scale: 2})
  total_amount!: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  payment_status!: PaymentStatus;

  @Column({ type: 'text', nullable: true })
  order_status!: string;

  @ManyToOne(() => Users, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  orderItems!: OrderItem[];

}
