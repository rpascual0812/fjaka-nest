import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { UsersDetail } from "./users_detail.entity";
// import { EmploymentType } from "./employment_type.entity";
// import { Account } from "../account/account.entity";
// import { Company } from "../company/company.entity";
// import { Timesheet } from "../timesheet/timesheet.entity";

@Entity()
// @Index("company_users_index", ['companyId', 'usersId'], { unique: true })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    // @OneToMany(() => UsersDetail, users_detail => users_detail.usersId)
    // @OneToMany(() => Timesheet, timesheet => timesheet.usersId)
    id: number;

    // @PrimaryColumn()
    // accountId: number;
    //
    // @OneToOne(() => Account, account => account.id, { primary: true })
    // @JoinColumn({ name: 'accountId' })
    // account: Promise<Account>;
    //
    // @PrimaryColumn()
    // companyId: number;
    //
    // @ManyToOne(() => Company, company => company.id, { primary: true })
    // @JoinColumn({ name: 'companyId' })
    // company: Promise<Company>;
    //
    // @Column()
    // usersNumber: string;
    //
    // @Column({ nullable: false })
    // lastName: string;
    //
    // @Column({ nullable: false })
    // firstName: string;
    //
    // @Column({ nullable: true })
    // middleName: string;
    //
    // @Column({ type: "date", nullable: false })
    // birthDate: string;
    //
    // @Column({ nullable: false })
    // jobTitle: string;
    //
    // @Column({ type: "date", nullable: false })
    // startDate: string;
    //
    // @PrimaryColumn()
    // employmentTypeId: number;
    //
    // @ManyToOne(() => EmploymentType, type => type.id)
    // @JoinColumn({ name: "employmentTypeId" })
    // employmentType: Promise<EmploymentType>;
    //
    // @Column({ type: "time", nullable: true })
    // scheduleFrom: string;
    //
    // @Column({ type: "time", nullable: true })
    // scheduleTo: string;
    //
    // @Column({ nullable: true })
    // workHours: number;
    //
    // @Column({ type: "time with time zone", nullable: true })
    // dateDeleted: string;
}

/**
* ****************Schedules******************
* Regular (select scheduleFrom and scheduleTo)
* Flexi time (select # of hours need to render)
* Don't track time (no tracking of time in and time out)
*/
