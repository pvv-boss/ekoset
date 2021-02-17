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

@Entity("sheld_service")
export default class DesWork {
    @PrimaryGeneratedColumn({
        type: "integer",
        name: "sheld_service_id",
    })
    sheldServiceId: number;

    @Column({
        name: "sheld_service_ball",
    })
    sheldServiceBall: number;

    @Column({
        name: "sheld_service_ball_description",
    })
    sheldServiceBallDescription: string;
}
