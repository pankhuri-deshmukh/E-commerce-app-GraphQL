import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products extends BaseEntity {

    @PrimaryGeneratedColumn()
    product_id!: number;
    
    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column()
    category!: string;

    @Column()
    quantity!: number;

    @Column()
    image!: string;
}