import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Transfer {
    //코인/토큰 입출금 내역의 ID
    @PrimaryGeneratedColumn()
    id: number;

    //출금 주소
    @Column()
    from: string;

    //입금 주소
    @Column()
    to: string;

    //암호화폐의 양
    @Column()
    amount: string;

    //트랜잭션 상태 > PENDING_APPROVAL REJECTED REQUESTED PENDING FAILED REVERTED REPLACED MINED CONFIRMED
    @Column()
    status: string;

    //지갑이 속한 팀(Client)의 ID
    @Column()
    clientId: string;

    //암호화폐의 소수점 자릿수
    @Column()
    decimals: number;

    //입출금 지갑 ID
    @Column()
    walletId: string;

    //입금 주소 ID
    @Column()
    depositAddressId: string;

    //암호화폐의 기호
    @Column()
    ticker: string;

    //입출금 타입 > WITHDRAWAL DEPOSIT
    @Column()
    transferType: string;

    //트랜잭션 ID
    @Column()
    transactionId: string;

    //트랜잭션 해시
    @Column()
    transactionHash: string;

    //홉 트랜잭션 ID (Solution Wallet 에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)
    @Column()
    hopTransactionId: string;

    //홉 트랜잭션 해시
    @Column()
    hopTransactionHash: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    //해당 내역의 지갑 또는 입금 주소의 이름
    @Column()
    name: string;

    //기타 정보 기록용 메타 데이터 (255자 제한)
    @Column()
    metadata: string;
}
