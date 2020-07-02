import { Column, Entity, PrimaryGeneratedColumn, RelationId, ManyToOne, JoinColumn } from 'typeorm';
import { SiteSection } from './SiteSection';
import { SeoMetaTags } from './SeoMetaTags';


@Entity('business_service')
export class BusinessService extends SeoMetaTags {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'business_service_id'
  })
  public businessServiceId: number;


  @ManyToOne((type) => SiteSection)
  @JoinColumn({ name: 'site_section_id' })
  public siteSection: Promise<SiteSection | null | number> | SiteSection;

  @Column({ name: 'site_section_id' })
  @RelationId((serv: BusinessService) => serv.siteSection)
  public siteSectionId: number;


  @Column('text', {
    nullable: false,
    name: 'business_service_name'
  })
  public businessServiceName: string;


  @Column('text', {
    nullable: true,
    name: 'business_service_h1'
  })
  public businessServiceH1: string;


  @Column('text', {
    nullable: true,
    name: 'business_service_slug'
  })
  public businessServiceSlug: string;


  @Column('text', {
    nullable: true,
    name: 'business_service_unit'
  })
  public businessServiceUnit: string;


  @Column('text', {
    nullable: true,
    name: 'business_service_price'
  })
  public businessServicePrice: string;


  @Column('numeric', {
    nullable: true,
    name: 'business_service_status'
  })
  public businessServiceStatus: number;


  @Column('numeric', {
    nullable: true,
    name: 'business_service_priority'
  })
  public businessServicePriority: number;


  @Column('numeric', {
    nullable: true,
    name: 'business_service_parent_id'
  })
  public businessServiceParentId: number;


  @Column({
    nullable: true,
    name: 'bs_banner_in_section_ind'
  })
  public bsBannerInSectionInd: number;

  @Column({
    nullable: true,
    name: 'bs_banner_in_section_title'
  })
  public bsBannerInSectionTitle: string;

  @Column({
    nullable: true,
    name: 'bs_banner_in_main_ind'
  })
  public bsBannerInMainInd: number;

  @Column({
    nullable: true,
    name: 'bs_banner_in_main_title'
  })
  public bsBannerInMainTitle: string;

}
