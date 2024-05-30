// import {
//     BaseEntity,
//     Column,
//     CreateDateColumn,
//     Entity,
//     PrimaryColumn,
//     PrimaryGeneratedColumn,
//     UpdateDateColumn
// } from 'typeorm';
// import {ApiProperty} from "@nestjs/swagger";
//
// @Entity('client_container')
// export class ClientContainer extends BaseEntity {
//     @PrimaryGeneratedColumn('uuid')
//     @ApiProperty({ description: 'id' })
//     id: string;
//
//     @PrimaryColumn({ length: 30 })
//     clientId: string;
//
//     @Column({ length: 50 })
//     api_key: string;
//
//     @Column({ length: 120 })
//     webhook_url: string;
//
//     @CreateDateColumn({ type: 'datetime' })
//     created_at: Date;
//
//     @UpdateDateColumn({ type: 'datetime' })
//     updated_at: Date;
//
//     static of(params: Partial<ClientContainer>): ClientContainer {
//         const clientContainer = new ClientContainer();
//         Object.assign(clientContainer, params);
//         return clientContainer;
//     }
//
//     update(name: string, breed: string, age: number): void {
//     }
// }
