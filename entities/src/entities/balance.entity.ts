import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Balance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  coinId: number;

  @Column()
  walletId: string;

  //확정된 잔액 (단위: wei, peb)
  @Column()
  amount: number;

  //출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액)(단위: wei, peb, jager)
  @Column()
  spendableAmount: string;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @Column()
  decimals: string;

  static of(params: Partial<Balance>): Balance {
    const balance = new Balance();
    Object.assign(balance, params);
    return balance;
  }
}
