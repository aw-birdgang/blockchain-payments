import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class DepositAddress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn({ length: 44 })
    address: string;

    @Column()
    name: string;

    @Column()
    network: string;

    @PrimaryColumn({ length: 140 })
    private_key: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    //트랜잭션 상태 > ACTIVE CREATING FAILED INACTIVE
    @Column()
    status: string;

    @Column()
    whitelistActivated: string;

    @Column()
    version: string;

    static of(params: Partial<DepositAddress>): DepositAddress {
        const depositAddress = new DepositAddress();
        Object.assign(depositAddress, params);
        return depositAddress;
    }

}

