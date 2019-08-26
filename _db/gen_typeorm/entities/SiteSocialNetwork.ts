import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("site_social_network",{schema:"brc_ekoset" } )
@Index("site_social_network_pk",["siteSocialNetId",],{unique:true})
export class SiteSocialNetwork {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"site_social_net_id"
        })
    siteSocialNetId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"site_social_net_name"
        })
    siteSocialNetName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"site_social_net_img"
        })
    siteSocialNetImg:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"site_social_net_url"
        })
    siteSocialNetUrl:string | null;
        
}
