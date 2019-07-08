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

}
