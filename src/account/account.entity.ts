import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { Session } from "../session/session.entity";

@Entity()
// @Index("account_username_index", ['username'], { unique: true })
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    // @OneToMany(() => Session, session => session.accountId)
    id: number;

    // @Column({ nullable: false })
    // username: string;
    //
    // @Column({ nullable: false })
    // password: string;
    //
    // @Column({ default: false })
    // verified: boolean;
    //
    // @Column({ nullable: true })
    // lastLogin: string;
    //
    // @Column({ default: 0 })
    // loginAttempts: number;
    //
    // @Column({ type: "time with time zone", nullable: true })
    // dateDeleted?: string;
}
