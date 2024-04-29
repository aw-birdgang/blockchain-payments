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
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Wallet extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id' })
  id: string;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 10 })
  network: string;

  @Transform((params) => params.value.trim())
  @PrimaryColumn({ length: 44 })
  address: string;

  @Transform((params) => params.value.trim())
  @Column({ length: 140 })
  private_key: string;

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
