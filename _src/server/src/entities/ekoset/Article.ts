import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { SiteSection } from './SiteSection';
import { RelatedArticle } from './RelatedArticle';


@Entity('article')
export class Article {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'article_id'
  })
  public articleId: number;


  @ManyToOne((type) => SiteSection)
  @JoinColumn({ name: 'site_section_id' })
  public siteSection: Promise<SiteSection | null>;

  @RelationId((article: Article) => article.siteSection)
  public siteSectionId: number;

  @Column('text', {
    nullable: false,
    name: 'article_publish_date'
  })
  public articlePublishDate: string;


  @Column('text', {
    nullable: true,
    name: 'article_author'
  })
  public articleAuthor: string | null;


  @Column('text', {
    nullable: false,
    name: 'article_title'
  })
  public articleTitle: string;


  @Column('text', {
    nullable: false,
    name: 'article_description'
  })
  public articleDescription: string;


  @Column('text', {
    nullable: true,
    name: 'article_body'
  })
  public articleBody: string | null;


  @Column('text', {
    nullable: true,
    name: 'article_preview_img_src'
  })
  public articlePreviewImgSrc: string | null;


  @Column('text', {
    nullable: true,
    name: 'article_header_img_src'
  })
  public articleHeaderImgSrc: string | null;


  @Column('text', {
    nullable: true,
    name: 'article_source'
  })
  public articleSource: string | null;


  @Column('numeric', {
    nullable: true,
    name: 'article_views_number'
  })
  public articleViewsNumber: number | null;


  @Column('numeric', {
    nullable: false,
    name: 'article_status'
  })
  public articleStatus: number;
}
