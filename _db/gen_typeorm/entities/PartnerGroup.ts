import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Partner} from "./Partner";


@Entity("partner_group",{schema:"brc_ekoset" } )
@Index("partner_group_pk",["partnerGroupId",],{unique:true})
export class PartnerGroup {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"partner_group_id"
        })
    partnerGroupId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"partner_group_name"
        })
    partnerGroupName:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"partner_group_priority"
        })
    partnerGroupPriority:string | null;
        

   
    @OneToMany(type=>Partner, partner=>partner.partnerGroup,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    partners:Promise<Partner[]>;
    
}
