import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('client')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 30 })
  name: string;

  @Column({ name: 'webhookUrl', length: 120 })
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

  update(name: string, breed: string, age: number): void {}
}
