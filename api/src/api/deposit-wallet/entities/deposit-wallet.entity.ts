import {Transform} from 'class-transformer';
import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Wallet} from "../../../entities";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class DepositWallet {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'id' })
  id: string;

  @Column({ name: 'client_id', length: 50, nullable: true })
  @ApiProperty({ description: '클라이언트 Id' })
  clientId: string;

  @PrimaryColumn({ length: 10 })
  network: string;

  @PrimaryColumn({ length: 44 })
  address: string;

  @Column({ length: 140 })
  private_key: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  static of(params: Partial<DepositWallet>): DepositWallet {
    const wallet = new DepositWallet();
    Object.assign(wallet, params);
    return wallet;
  }

}