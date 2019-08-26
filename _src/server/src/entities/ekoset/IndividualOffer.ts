import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { SiteSection } from './SiteSection';


@Entity('individual_offer', { schema: 'brc_ekoset' })
export class IndividualOffer {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'ind_offer_id'
  })
  public indOfferId: number;

  @Column('integer', {
    nullable: true,
    name: 'cl_client_id'
  })
  public clClientId: number | null;



  @ManyToOne(() => SiteSection)
  @JoinColumn({ name: 'site_section_id' })
  public siteSection: Promise<SiteSection | null | number>;

  @RelationId((individual_offer: IndividualOffer) => individual_offer.siteSection)
  public siteSectionId: number | null;

  @Column('text', {
    nullable: false,
    name: 'ind_offer_name'
  })
  public indOfferName: string;


  @Column('text', {
    nullable: true,
    name: 'ind_offer_slug'
  })
  public indOfferSlug: string | null;


  @Column('text', {
    nullable: true,
    name: 'ind_offer_img_small'
  })
  public indOfferImgSmall: string | null;


  @Column('text', {
    nullable: true,
    name: 'ind_offer_img_big'
  })
  public indOfferImgBig: string | null;


  @Column('numeric', {
    nullable: true,
    name: 'ind_offer_priority'
  })
  public indOfferPriority: string | null;


  @Column('numeric', {
    nullable: true,
    name: 'ind_offer_status'
  })
  public indOfferStatus: number | null;

}
