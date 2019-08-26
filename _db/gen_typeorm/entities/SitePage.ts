import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {MetaTagContent} from "./MetaTagContent";


@Entity("site_page",{schema:"brc_ekoset" } )
@Index("site_page_pk",["sitePageId",],{unique:true})
export class SitePage {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"site_page_id"
        })
    sitePageId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"site_page_name"
        })
    sitePageName:string | null;
        

   
    @OneToMany(type=>MetaTagContent, meta_tag_content=>meta_tag_content.sitePage,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    metaTagContents:Promise<MetaTagContent[]>;
    
}
