import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class UserActionLog extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    actionDate: Date;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    actionId: number;

    @Column()
    actionTime: Time;

    @Column()
    actionType: string;

    @ManyToOne(() => User, user => user.userActionLogs)
    user: User;

    @ManyToOne(() => Action, action => action.userActionLogs)
    action: Action;
}
