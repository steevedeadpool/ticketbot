import { Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm"

@Entity()
export class Support {
    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column()
    serverid: string

    @Column()
    rolesid: string
}