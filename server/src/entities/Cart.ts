import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Cart_Items } from './Cart_Items';

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_id!: number;

  @Column()
  total_amount!: number;

  @OneToMany(() => Cart_Items, orderItem => orderItem.order)
  cartItems!: Cart_Items[];

}

