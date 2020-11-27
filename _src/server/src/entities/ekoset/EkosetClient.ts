import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm';


@Entity('person')
export default class EkosetClient {

    @PrimaryGeneratedColumn({
        type: 'integer',
        name: 'person_id'
    })
    personId: number

    @Column({
        name: 'manager_id'
    })
    managerId: number

    @Column({
        name: 'person_name'
    })
    personName: string

    @Column({
        name: 'person_phone'
    })
    personPhone: number

    @Column({
        name: 'person_email'
    })
    personEmail: string

    @Column({
        name: 'person_date_ch'
    })
    personDateCh: string

    @Column({
        name: 'person_birthday'
    })
    personBirthday: string

    @Column({
        name: 'app_user_id'
    })
    appUserId: number
}