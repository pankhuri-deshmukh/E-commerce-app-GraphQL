import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users'; 
import { Products } from './Products'; 

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  review_id!: number;

  @Column({ type: 'int', nullable: false })
  rating!: number;

  @Column({ type: 'text', nullable: true })
  comment!: string;

  @ManyToOne(() => Users, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @ManyToOne(() => Products, product => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product!: Products;

  ///////////

 
}
