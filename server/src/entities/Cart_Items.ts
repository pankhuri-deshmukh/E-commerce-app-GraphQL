import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './Cart';
import { Products } from './Products';

//Link Product ID
//import { Products } from './Products';


@Entity()
export class Cart_Items extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_item_id!: number;

  @Column()
  quantity!: number;

  @Column()
  subtotal!: number;

  @ManyToOne(() => Cart, order => order.cartItems)
  @JoinColumn({ name: 'order_id' })
  order!: Cart;

  @ManyToOne(() => Products, product => product.cItems)
  @JoinColumn({ name: 'product_id' })
  product!: Products;

}
