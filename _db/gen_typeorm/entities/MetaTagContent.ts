import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SitePage} from "./SitePage";
import {ClMetaTag} from "./ClMetaTag";


@Entity("meta_tag_content",{schema:"brc_ekoset" } )
@Index("relationship_18_fk",["clMetaTag",])
@Index("meta_tag_content_pk",["metaTagContentId",],{unique:true})
@Index("relationship_17_fk",["sitePage",])
export class MetaTagContent {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"meta_tag_content_id"
        })
    metaTagContentId:number;
        

   
    @ManyToOne(type=>SitePage, site_page=>site_page.metaTagContents,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'site_page_id'})
    sitePage:Promise<SitePage | null>;

    @RelationId((meta_tag_content: MetaTagContent) => meta_tag_content.sitePage)
    sitePageId: Promise<number[]>;

   
    @ManyToOne(type=>ClMetaTag, cl_meta_tag=>cl_meta_tag.metaTagContents,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'cl_meta_tag_id'})
    clMetaTag:Promise<ClMetaTag | null>;

    @RelationId((meta_tag_content: MetaTagContent) => meta_tag_content.clMetaTag)
    clMetaTagId: Promise<number[]>;

    @Column("text",{ 
        nullable:true,
        name:"meta_tag_content_val"
        })
    metaTagContentVal:string | null;
        
}
