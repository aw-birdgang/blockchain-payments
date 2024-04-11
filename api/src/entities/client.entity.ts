import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Transform } from 'class-transformer';

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @PrimaryColumn({ name: 'client_code', length: 30 })
    clientCode: string;

    @Column({ name: 'client_name',length: 30 })
    clientName: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;
}


@Entity('client_container')
export class ClientContainer {
    @Transform((params) => params.value.trim())
    @PrimaryColumn({ length: 30 })
    group_code: string;

    @Transform((params) => params.value.trim())
    @Column({ length: 50 })
    api_key: string;

    @Transform((params) => params.value.trim())
    @Column({ length: 120 })
    webhook_href: string;

    @CreateDateColumn({ type: 'datetime' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
