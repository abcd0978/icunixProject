import { Entity, PrimaryColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { User } from './User';

@Entity()
export class Role extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;
    // Guest, User, Admin

    @Column()
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}