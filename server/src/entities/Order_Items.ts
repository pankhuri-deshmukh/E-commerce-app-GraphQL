import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { Orders } from './Orders';
import { Products } from './Products';

@Entity()
export class OrderItem extends BaseEntity{
  @PrimaryGeneratedColumn()
  item_id!: number;

  @Column()
  quantity!: number;

  @Column({type: 'decimal', precision: 10, scale: 2})
  subtotal!: number;

  @ManyToOne(() => Orders, order => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order!: Orders;

  @ManyToOne(() => Products, product => product.oItems)
  @JoinColumn({ name: 'product_id' })
  product!: Products;
  
}
