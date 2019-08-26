import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {PartnerGroup} from "./PartnerGroup";


@Entity("partner",{schema:"brc_ekoset" } )
@Index("relationship_15_fk2",["partnerGroup",])
@Index("partner_pk",["partnerId",],{unique:true})
export class Partner {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"partner_id"
        })
    partnerId:number;
        

   
    @ManyToOne(type=>PartnerGroup, partner_group=>partner_group.partners,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'partner_group_id'})
    partnerGroup:Promise<PartnerGroup | null>;

    @RelationId((partner: Partner) => partner.partnerGroup)
    partnerGroupId: Promise<number[]>;

    @Column("text",{ 
        nullable:true,
        name:"partner_name"
        })
    partnerName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"partner_url"
        })
    partnerUrl:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"partner_priority"
        })
    partnerPriority:string | null;
        
}
