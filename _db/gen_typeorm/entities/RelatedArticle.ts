import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Article} from "./Article";


@Entity("related_article",{schema:"brc_ekoset" } )
@Index("ind_art_article_id",["artArticle",])
@Index("ind_article_id",["article",])
@Index("related_news_pk",["relatedArticleId",],{unique:true})
export class RelatedArticle {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"related_article_id"
        })
    relatedArticleId:number;
        

   
    @ManyToOne(type=>Article, article=>article.relatedArticles2,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'article_id'})
    article:Promise<Article | null>;

    @RelationId((related_article: RelatedArticle) => related_article.article)
    articleId: Promise<number[]>;

   
    @ManyToOne(type=>Article, article=>article.relatedArticles,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'art_article_id'})
    artArticle:Promise<Article | null>;

    @RelationId((related_article: RelatedArticle) => related_article.artArticle)
    artArticleId: Promise<number[]>;
}
