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
// import { Role } from './Role';
// import { Student } from './Student';
// import { UserActionLog } from './UserActionLog';

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

    @Column({ nullable: true })
    roleId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    profile: string;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        // log hashPasswordBeforeInsert
        console.log('hashPasswordBeforeInsert');
        console.log('this.password: ', this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log('this.password: ', this.password);
    }

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    async isPassword(attempt: string) {
        const match = await bcrypt.compare(attempt, this.password);

        if (match) return true;
        return false;
    }

    // @OneToOne(() => Student)
    // @JoinColumn()
    // student: Student;

    // @ManyToOne(() => Role, (role) => role.users)
    // role: Role;

    // @OneToMany(() => UserActionLog, (userActionLog) => userActionLog.id)
    // userActionLogs: UserActionLog[];
}
