import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ownerid: string

    @Column()
    channelid: string
}