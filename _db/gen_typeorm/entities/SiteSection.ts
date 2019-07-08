import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Article} from "./Article";


@Entity("site_section",{schema:"brc_ekoset" } )
@Index("site_section_pk",["siteSectionId",],{unique:true})
export class SiteSection {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"site_section_id"
        })
    siteSectionId:number;
        

    @Column("text",{ 
        nullable:false,
        name:"site_section_name"
        })
    siteSectionName:string;
        

   
    @OneToMany(type=>Article, article=>article.siteSection,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    articles:Promise<Article[]>;
    
}
