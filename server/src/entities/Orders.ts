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


// import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
// import { Users } from './Users';
// import { Order_Item } from './Order_Items';

// @Entity()
// export class Orders extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   order_id!: number;

//   @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
//   total_amount!: number;

//   @Column({ type: 'varchar', nullable: false })
//   payment_status!: string;

//   @Column({ type: 'enum', enum: ['confirmed', 'cancelled'], nullable: false })
//   status!: 'confirmed' | 'cancelled';

//   @ManyToOne(() => Users, (user) => user.orders)
//   @JoinColumn({ name: 'user_id' })
//   user!: Users;
 

//   ///////////////////////

  
// }
