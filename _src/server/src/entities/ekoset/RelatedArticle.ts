import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Article } from './Article';


@Entity('related_article')
export class RelatedArticle {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'related_article_id'
  })
  public relatedArticleId: number;



  @ManyToOne((type) => Article)
  @JoinColumn({ name: 'article_id' })
  public article: Promise<Article | null>;

  @RelationId((related_article: RelatedArticle) => related_article.article)
  public articleId: number;


  @ManyToOne((type) => Article)
  @JoinColumn({ name: 'art_article_id' })
  public artArticle: Promise<Article | null>;

  @RelationId((related_article: RelatedArticle) => related_article.artArticle)
  public artArticleId: number;
}
