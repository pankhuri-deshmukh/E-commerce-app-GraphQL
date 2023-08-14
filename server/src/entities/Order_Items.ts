import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orders } from './Orders';

//does this need to be linked to products? one to one or many to one?
//import { Products } from './Products';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  item_id!: number;

  @Column()
  quantity!: number;

  @Column()
  subtotal!: number;

  @ManyToOne(() => Orders, order => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order!: Orders;

}



// import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

// @Entity()
// export class OrderItem extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   item_id!: number;

//   @Column({ type: 'int', nullable: false })
//   quantity!: number;

//   @Column({ type: 'decimal', nullable: false })
//   subtotal!: number;

// }
