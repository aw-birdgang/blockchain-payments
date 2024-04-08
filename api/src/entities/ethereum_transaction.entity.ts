import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EthereumTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column('bigint')
    value: string;

    @Column()
    data: string;

    @Column()
    blockNumber: number;
}