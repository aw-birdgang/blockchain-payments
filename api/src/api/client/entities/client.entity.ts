import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity('client')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'id' })
    id: string;

    @Column({ name: 'name', length: 30 })
    @ApiProperty({ description: '이름' })
    name: string;

    @Column({ name: 'webhookUrl', length: 120 })
    @ApiProperty({ description: '콜백 주소' })
    webhookUrl: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt: Date;

    static of(params: Partial<Client>): Client {
        const client = new Client();
        Object.assign(client, params);
        return client;
    }

    update(name: string, breed: string, age: number): void {
    }

}
