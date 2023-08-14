import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orders } from './Orders';
import { Products } from './Products';

//Link Product ID
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

  @ManyToOne(() => Products, product => product.oItems)
  @JoinColumn({ name: 'product_id' })
  product!: Products;
  
}
