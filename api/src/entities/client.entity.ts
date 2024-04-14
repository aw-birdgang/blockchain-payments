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

@Entity('client')
export class Client extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    id: number;

    @PrimaryColumn({ name: 'code', length: 30 })
    @ApiProperty({ description: '코드' })
    code: string;

    @Column({ name: 'name',length: 30 })
    @ApiProperty({ description: '이름' })
    name: string;

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
