import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  stock: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;


}