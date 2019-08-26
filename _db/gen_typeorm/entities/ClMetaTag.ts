import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {MetaTagContent} from "./MetaTagContent";


@Entity("cl_meta_tag",{schema:"brc_ekoset" } )
@Index("cl_meta_tag_pk",["clMetaTagId",],{unique:true})
export class ClMetaTag {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"cl_meta_tag_id"
        })
    clMetaTagId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_meta_tag_name"
        })
    clMetaTagName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_meta_tag_hid"
        })
    clMetaTagHid:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_meta_tag_property"
        })
    clMetaTagProperty:string | null;
        

   
    @OneToMany(type=>MetaTagContent, meta_tag_content=>meta_tag_content.clMetaTag,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    metaTagContents:Promise<MetaTagContent[]>;
    
}
