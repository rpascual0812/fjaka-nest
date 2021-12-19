import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Users } from "./employee.entity";

@Entity()
export class UserDetails extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @PrimaryColumn()
    // employeeId: number;
    //
    // @ManyToOne(() => Users, employee => employee.id, { primary: true })
    // @JoinColumn({ name: "employeeId" })
    // employee: Promise<Users>;
    //
    // @Column()
    // field: string;
    //
    // @Column()
    // value: string;
}
