import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './Cart';

//does this need to be linked to products? one to one or many to one?
//import { Products } from './Products';


@Entity()
export class Cart_Items extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_item_id!: number;

  @Column()
  quantity!: number;

  @ManyToOne(() => Cart, order => order.cartItems)
  @JoinColumn({ name: 'order_id' })
  order!: Cart;

}
