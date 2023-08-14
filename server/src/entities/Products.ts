import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from './Review'

@Entity()
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id!: number;

  @Column({ type: 'varchar', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number;

  @Column({ type: 'varchar', nullable: false })
  category!: string;

  @Column({ type: 'int', nullable: false })
  quantity!: number;

  @Column({ type: 'varchar', nullable: true })
  image!: string;

  @OneToMany(() => Review, review => review.product)
  reviews!: Review

  /////////////////////


}
