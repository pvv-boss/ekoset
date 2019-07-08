import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {AppUserSession} from "./AppUserSession";
import {AppUserSocialNetProfile} from "./AppUserSocialNetProfile";


@Entity("app_user",{schema:"brc_ekoset" } )
@Index("ind_app_user_email",["appUserEmail",])
@Index("ind_app_user_reg_token",["appUserRegToken",])
@Index("ind_app_user_reset_pwd_date",["appUserResetPwdDate",])
export class AppUser {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"app_user_id"
        })
    appUserId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"app_user_full_name"
        })
    appUserFullName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"app_user_email"
        })
    appUserEmail:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"app_user_pwd_hash"
        })
    appUserPwdHash:string | null;
        

    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"app_user_reg_date"
        })
    appUserRegDate:Date | null;
        

    @Column("integer",{ 
        nullable:true,
        default: () => "0",
        name:"app_user_blocked_ind"
        })
    appUserBlockedInd:number | null;
        

    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"app_user_blocked_date"
        })
    appUserBlockedDate:Date | null;
        

    @Column("text",{ 
        nullable:true,
        name:"app_user_reset_pwd"
        })
    appUserResetPwd:string | null;
        

    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"app_user_reset_exp_date"
        })
    appUserResetExpDate:Date | null;
        

    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"app_user_reset_pwd_date"
        })
    appUserResetPwdDate:Date | null;
        

    @Column("integer",{ 
        nullable:true,
        default: () => "0",
        name:"app_user_reg_verified_ind"
        })
    appUserRegVerifiedInd:number | null;
        

    @Column("character varying",{ 
        nullable:true,
        length:36,
        name:"app_user_reg_token"
        })
    appUserRegToken:string | null;
        

   
    @OneToMany(type=>AppUserSession, app_user_session=>app_user_session.appUser,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    appUserSessions:Promise<AppUserSession[]>;
    

   
    @OneToMany(type=>AppUserSocialNetProfile, app_user_social_net_profile=>app_user_social_net_profile.appUser,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    appUserSocialNetProfiles:Promise<AppUserSocialNetProfile[]>;
    
}
