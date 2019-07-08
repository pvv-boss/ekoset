import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {AppUser} from "./AppUser";


@Entity("app_user_session",{schema:"brc_ekoset" } )
@Index("relationship_1_fk",["appUser",])
@Index("ind_user_session_token",["userSessionToken",])
export class AppUserSession {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"user_session_id"
        })
    userSessionId:number;
        

   
    @ManyToOne(type=>AppUser, app_user=>app_user.appUserSessions,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'app_user_id'})
    appUser:Promise<AppUser | null>;

    @RelationId((app_user_session: AppUserSession) => app_user_session.appUser)
    appUserId: Promise<number[]>;

    @Column("timestamp with time zone",{ 
        nullable:false,
        name:"user_session_created_at"
        })
    userSessionCreatedAt:Date;
        

    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"user_session_updated_at"
        })
    userSessionUpdatedAt:Date | null;
        

    @Column("timestamp with time zone",{ 
        nullable:true,
        name:"user_session_expired_at"
        })
    userSessionExpiredAt:Date | null;
        

    @Column("cidr",{ 
        nullable:true,
        name:"user_session_ip"
        })
    userSessionIp:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"user_session_os"
        })
    userSessionOs:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"user_session_browser"
        })
    userSessionBrowser:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"user_session_agent"
        })
    userSessionAgent:string | null;
        

    @Column("character varying",{ 
        nullable:true,
        length:36,
        name:"user_session_token"
        })
    userSessionToken:string | null;
        

    @Column("integer",{ 
        nullable:true,
        name:"user_session_block_ind"
        })
    userSessionBlockInd:number | null;
        
}
