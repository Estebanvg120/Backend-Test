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
  nameDelivery: string;

  @Column()
  lastnameDelivery: string;

  @Column()
  documentType: string;

  @Column()
  document: string;

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