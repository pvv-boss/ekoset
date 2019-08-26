import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {BusinessService} from "./BusinessService";


@Entity("business_service_cl_client",{schema:"brc_ekoset" } )
@Index("relationship_10_pk",["businessService","clClientId",],{unique:true})
@Index("relationship_12_fk",["businessService",])
export class BusinessServiceClClient {

    @Column("integer",{ 
        nullable:false,
        primary:true,
        name:"cl_client_id"
        })
    clClientId:number;
        

   
    @ManyToOne(type=>BusinessService, business_service=>business_service.businessServiceClClients,{ primary:true, nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'business_service_id'})
    businessService:Promise<BusinessService | null>;

    @RelationId((business_service_cl_client: BusinessServiceClClient) => business_service_cl_client.businessService)
    businessServiceId: Promise<number[]>;
}
