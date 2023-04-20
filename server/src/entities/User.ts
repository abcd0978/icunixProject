import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from './Role';
import { Student } from './Student';
import { UserActionLog } from './UserActionLog';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    studentId: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    roleId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    profile: string;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    async comparePassword(attempt: string) {
        bcrypt.compare(attempt, this.password, (err, isMatch) => {
            if (err) {
                console.log(err);
            } else {
                return isMatch;
            }
        });
    }

    @OneToOne(() => Student)
    @JoinColumn()
    student: Student;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @OneToMany(() => UserActionLog, (userActionLog) => userActionLog.id)
    userActionLogs: UserActionLog[];
}
