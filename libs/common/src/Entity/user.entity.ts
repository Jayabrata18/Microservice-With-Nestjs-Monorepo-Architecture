/* eslint-disable prettier/prettier */

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Role } from "../interface/role.interface";




@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @Column({ unique: true })
    userId: string;

    @BeforeInsert()
    generateUserId() {
        if (!this.userId) {
            this.userId = crypto.randomBytes(5).toString('hex');
        }
    }

    @Column({ nullable: true })
    avatar?: string;

    @Column({ type: 'varchar', default: "asdf-qwer-zxcv-mnbv" })
    apikey: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @Column({
        type: 'simple-array',
        default: [Role.USER],
        transformer: {
            from: (value) => JSON.parse(value),
            to: (value) => JSON.stringify(value)
        }
    })

    role: Role[];

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'date', nullable: true })
    dateOfBirth: Date;

    @Column({ nullable: true })
    address: string;

}