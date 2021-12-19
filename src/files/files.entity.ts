import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

// import { Employee } from "../employee/employee.entity";

@Entity()
export class Files extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @PrimaryColumn()
    // employeeId: number;
    //
    // @ManyToOne(() => Employee, employee => employee.id, { primary: true })
    // @JoinColumn({ name: "employeeId" })
    // employee: Promise<Employee>;
    //
    // @Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
    // scheduleFrom: string;
    //
    // @Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
    // scheduleTo: string;
    //
    // @Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
    // timeIn: string;
    //
    // @Column({ type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
    // timeOut: string;
}
