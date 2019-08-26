import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('site_section')
export class SiteSection {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'site_section_id'
  })
  public siteSectionId: number;


  @Column('text', {
    nullable: false,
    name: 'site_section_name'
  })
  public siteSectionName: string;


  @Column('text', {
    nullable: true,
    name: 'site_section_slug'
  })
  public siteSectionSlug: string | null;


  @Column('text', {
    nullable: true,
    name: 'site_section_img_big'
  })
  public siteSectionImgBig: string | null;


  @Column('text', {
    nullable: true,
    name: 'site_section_img_small'
  })
  public siteSectionImgSmall: string | null;


  @Column('numeric', {
    nullable: true,
    name: 'site_section_priority'
  })
  public siteSectionPriority: string | null;


  @Column('numeric', {
    nullable: true,
    name: 'site_section_status'
  })
  public siteSectionStatus: number | null;
}
