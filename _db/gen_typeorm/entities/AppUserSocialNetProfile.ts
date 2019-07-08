import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {AppUser} from "./AppUser";


@Entity("app_user_social_net_profile",{schema:"brc_ekoset" } )
@Index("relationship_2_fk",["appUser",])
@Index("ind_sn_profile_code",["userSnProfileCode",])
@Index("ind_sn_profile_type",["userSnProfileType",])
export class AppUserSocialNetProfile {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"user_sn_profile_id"
        })
    userSnProfileId:number;
        

   
    @ManyToOne(type=>AppUser, app_user=>app_user.appUserSocialNetProfiles,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'app_user_id'})
    appUser:Promise<AppUser | null>;

    @RelationId((app_user_social_net_profile: AppUserSocialNetProfile) => app_user_social_net_profile.appUser)
    appUserId: Promise<number[]>;

    @Column("numeric",{ 
        nullable:false,
        name:"user_sn_profile_code"
        })
    userSnProfileCode:string;
        

    @Column("text",{ 
        nullable:false,
        name:"user_sn_profile_type"
        })
    userSnProfileType:string;
        

    @Column("text",{ 
        nullable:true,
        name:"user_sn_profile_nick"
        })
    userSnProfileNick:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"user_sn_profile_email"
        })
    userSnProfileEmail:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"user_sn_profile_link"
        })
    userSnProfileLink:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"user_sn_profile_avatar"
        })
    userSnProfileAvatar:string | null;
        
}
