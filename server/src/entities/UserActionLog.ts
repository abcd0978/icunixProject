import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { User } from './User';
import { Action } from './Action';

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
    actionTime: Date;

    @Column()
    actionType: string;

    @ManyToOne(() => User, (user) => user.userActionLogs)
    user: User;

    @ManyToOne(() => Action, (action) => action.userActionLogs)
    action: Action;
}
