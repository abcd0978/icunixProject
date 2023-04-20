import { Entity, PrimaryColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { User } from './User';
import { UserActionLog } from './UserActionLog';

@Entity()
export class Action extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;
    // login, logout, pageMove, etc

    @Column()
    description: string;

    @OneToMany(() => UserActionLog, (userActionLog) => userActionLog.action)
    userActionLogs: UserActionLog[];
}
