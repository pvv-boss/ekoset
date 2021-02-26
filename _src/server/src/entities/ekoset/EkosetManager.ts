import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    RelationId,
} from "typeorm";

@Entity("manager")
export default class EkosetManager {
    @PrimaryGeneratedColumn({
        type: "integer",
        name: "manager_id",
    })
    managerId: number;

    @Column({
        name: "manager_name",
    })
    managerName: string;

    @Column({
        name: "manager_phone",
    })
    managerPhone: string;

    @Column({
        name: "manager_email",
    })
    managerEmail: string;

    @Column({
        name: "app_user_id",
    })
    appUserId: number;

    @Column({
        name: "manager_photo_path",
    })
    managerPhotoPath: string;

    get personPhone() {
        return this.managerPhone;
    }

    get personEmail() {
        return this.managerEmail;
    }
}
