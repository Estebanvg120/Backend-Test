import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity('delivery')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @Column()
  city: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  documentType: string;

  @Column()
  documentNumber: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  complement: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.id, {
    onDelete: 'CASCADE',
  })
  transaction: Transaction;

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;


}