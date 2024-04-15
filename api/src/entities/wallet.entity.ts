import { Transform } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 10 })
  network: string;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 44 })
  address: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 140 })
  private_key: string;

  @Transform((params) => params.value.trim())
  @Column({ name: 'client_id', length: 50, nullable: true })
  clientId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;


  static of(params: Partial<Wallet>): Wallet {
    const wallet = new Wallet();
    Object.assign(wallet, params);
    return wallet;
  }

}
