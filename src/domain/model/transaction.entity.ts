import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';

@Entity('transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 9, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column()
  external_id: string;

  @Column({ default: 'PENDING', nullable: false })
  state: string;

  @ManyToOne(() => Customer, (customer) => customer.id, {
    onDelete: 'CASCADE',
  })
  customer: Customer;

  @ManyToOne(() => Product, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ default: 0 })
  quantityProduct: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;


}