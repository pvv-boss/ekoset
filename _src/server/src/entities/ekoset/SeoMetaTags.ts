import { Column } from 'typeorm';

export abstract class SeoMetaTags {


  @Column('text', {
    nullable: true,
    name: 'seo_title'
  })
  public seoTitle: string;

  @Column('text', {
    nullable: true,
    name: 'seo_description'
  })
  public seoDescription: string;

  @Column('text', {
    nullable: true,
    name: 'seo_keywords'
  })
  public seoKeywords: string;

  @Column('text', {
    nullable: true,
    name: 'seo_image'
  })
  public seoImage: string;

  @Column('text', {
    nullable: true,
    name: 'seo_url'
  })
  public seoUrl: string;
}
