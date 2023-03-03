import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Student extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    birthDate: Date;
}