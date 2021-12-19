import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { Account } from "../account/account.entity";

@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @PrimaryColumn()
    // accountId: number;
    //
    // @ManyToOne(() => Account, account => account.id, { primary: true })
    // @JoinColumn({ name: 'accountId' })
    // account: Promise<Account>;
    //
    // @Column({ nullable: false })
    // token: string;
    //
    // @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    // expiration?: string;
    //
    // @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    // dateCreated?: string;
}
