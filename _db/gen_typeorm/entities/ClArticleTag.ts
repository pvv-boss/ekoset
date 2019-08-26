import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Article} from "./Article";


@Entity("cl_article_tag",{schema:"brc_ekoset" } )
@Index("cl_article_tag_pk",["clArticleId",],{unique:true})
export class ClArticleTag {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"cl_article_id"
        })
    clArticleId:number;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_article_name"
        })
    clArticleName:string | null;
        

   
    @ManyToMany(type=>Article, article=>article.clArticleTags)
    articles:Promise<Article[]>;
    
}
