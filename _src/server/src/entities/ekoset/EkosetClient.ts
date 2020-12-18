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



    @Column({
        name: 'notif_future_work'
    })
    notifFutureWork: boolean

    @Column({
        name: 'notif_end_work'
    })
    notifEndWork: boolean

    @Column({
        name: 'notif_design_sanitary_doc'
    })
    notifDesignSanitaryDoc: boolean

    @Column({
        name: 'notif_finished_sanitary_doc'
    })
    notifFinishedSanitaryDoc: boolean

    @Column({
        name: 'notif_lab_protocol'
    })
    notifLabProtocol: boolean

    @Column({
        name: 'notif_email_ind'
    })
    notifEmailInd: boolean

    @Column({
        name: 'notif_sms_ind'
    })
    notifSmsInd: boolean


    managerName: string
    managerPhone: string
    managerEmail: string

}
