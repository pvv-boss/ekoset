import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SiteSection} from "./SiteSection";
import {RelatedArticle} from "./RelatedArticle";
import {ClArticleTag} from "./ClArticleTag";
import {BusinessService} from "./BusinessService";


@Entity("article",{schema:"brc_ekoset" } )
@Index("news_pk",["articleId",],{unique:true})
@Index("ind_site_section_id",["siteSection",])
export class Article {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"article_id"
        })
    articleId:number;
        

   
    @ManyToOne(type=>SiteSection, site_section=>site_section.articles,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'site_section_id'})
    siteSection:Promise<SiteSection | null>;

    @RelationId((article: Article) => article.siteSection)
    siteSectionId: Promise<number[]>;

    @Column("timestamp with time zone",{ 
        nullable:false,
        name:"article_publish_date"
        })
    articlePublishDate:Date;
        

    @Column("text",{ 
        nullable:true,
        name:"article_author"
        })
    articleAuthor:string | null;
        

    @Column("text",{ 
        nullable:false,
        name:"article_title"
        })
    articleTitle:string;
        

    @Column("text",{ 
        nullable:true,
        name:"article_slug"
        })
    articleSlug:string | null;
        

    @Column("text",{ 
        nullable:false,
        name:"article_description"
        })
    articleDescription:string;
        

    @Column("text",{ 
        nullable:true,
        name:"article_body"
        })
    articleBody:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"article_preview_img_src"
        })
    articlePreviewImgSrc:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"article_header_img_src"
        })
    articleHeaderImgSrc:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"article_source"
        })
    articleSource:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"article_views_number"
        })
    articleViewsNumber:string | null;
        

    @Column("numeric",{ 
        nullable:false,
        name:"article_status"
        })
    articleStatus:string;
        

   
    @OneToMany(type=>RelatedArticle, related_article=>related_article.artArticle,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    relatedArticles:Promise<RelatedArticle[]>;
    

   
    @OneToMany(type=>RelatedArticle, related_article=>related_article.article,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    relatedArticles2:Promise<RelatedArticle[]>;
    

   
    @ManyToMany(type=>ClArticleTag, cl_article_tag=>cl_article_tag.articles,{  nullable:false, })
    @JoinTable({ name:'article_cl_article_tag'})
    clArticleTags:Promise<ClArticleTag[]>;
    
    @RelationId((article: Article) => article.clArticleTags)
    clArticleTagsId: Promise<undefined[]>;

   
    @ManyToMany(type=>BusinessService, business_service=>business_service.articles)
    businessServices:Promise<BusinessService[]>;
    
}
