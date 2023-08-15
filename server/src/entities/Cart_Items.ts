import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './Cart';
import { Products } from './Products';

@Entity()
export class Cart_Items extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_item_id!: number;

  @Column()
  quantity!: number;

  @Column({type: 'decimal', precision: 10, scale: 2})
  subtotal!: number;

  @ManyToOne(() => Cart, cart => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart!: Cart;

  @ManyToOne(() => Products, product => product.cItems)
  @JoinColumn({ name: 'product_id' })
  product!: Products;

}
