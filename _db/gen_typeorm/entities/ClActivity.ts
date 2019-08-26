import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {IndividualOffer} from "./IndividualOffer";
import {BusinessService} from "./BusinessService";


@Entity("cl_activity",{schema:"brc_ekoset" } )
@Index("cl_activity_pk",["clActivityId",],{unique:true})
export class ClActivity {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"cl_activity_id"
        })
    clActivityId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_activity_name"
        })
    clActivityName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_activity_img_big"
        })
    clActivityImgBig:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_activity_img_small"
        })
    clActivityImgSmall:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"cl_activity_status"
        })
    clActivityStatus:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"cl_activity_priority"
        })
    clActivityPriority:string | null;
        

   
    @OneToMany(type=>IndividualOffer, individual_offer=>individual_offer.clActivity,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    individualOffers:Promise<IndividualOffer[]>;
    

   
    @ManyToMany(type=>BusinessService, business_service=>business_service.clActivitys,{  nullable:false, })
    @JoinTable({ name:'business_service_activity'})
    businessServices:Promise<BusinessService[]>;
    
    @RelationId((cl_activity: ClActivity) => cl_activity.businessServices)
    businessServicesId: Promise<undefined[]>;
}
