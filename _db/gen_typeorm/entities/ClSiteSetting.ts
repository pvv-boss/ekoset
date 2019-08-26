import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("cl_site_setting",{schema:"brc_ekoset" } )
@Index("cl_site_setting_pk",["clSiteSettingId",],{unique:true})
export class ClSiteSetting {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"cl_site_setting_id"
        })
    clSiteSettingId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_site_setting_name"
        })
    clSiteSettingName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_site_setting_val"
        })
    clSiteSettingVal:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_site_setting_display_name"
        })
    clSiteSettingDisplayName:string | null;
        
}
