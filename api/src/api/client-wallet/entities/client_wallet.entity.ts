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
import {Wallet} from "../../../entities/wallet.entity";

@Entity()
export class ClientWallet extends Wallet {

  @Transform((params) => params.value.trim())
  @Column({ name: 'client_id', length: 50, nullable: true })
  clientId: string;

  static of(params: Partial<ClientWallet>): ClientWallet {
    const wallet = new ClientWallet();
    Object.assign(wallet, params);
    return wallet;
  }

}

