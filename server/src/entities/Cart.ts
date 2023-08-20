import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Cart_Items } from './Cart_Items';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_id!: number;

  @Column({type: 'decimal', precision: 10, scale: 2})
  total_amount!: number;

  @OneToMany(() => Cart_Items, orderItem => orderItem.cart)
  cartItems!: Cart_Items[];

}

