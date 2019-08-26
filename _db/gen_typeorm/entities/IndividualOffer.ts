import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {ClActivity} from "./ClActivity";
import {SiteSection} from "./SiteSection";


@Entity("individual_offer",{schema:"brc_ekoset" } )
@Index("relationship_5_fk",["clActivity",])
@Index("individual_offer_pk",["indOfferId",],{unique:true})
@Index("relationship_6_fk",["siteSection",])
export class IndividualOffer {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"ind_offer_id"
        })
    indOfferId:number;
        

   
    @ManyToOne(type=>ClActivity, cl_activity=>cl_activity.individualOffers,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'cl_activity_id'})
    clActivity:Promise<ClActivity | null>;

    @RelationId((individual_offer: IndividualOffer) => individual_offer.clActivity)
    clActivityId: Promise<number[]>;

    @Column("integer",{ 
        nullable:true,
        name:"cl_client_id"
        })
    clClientId:number | null;
        

   
    @ManyToOne(type=>SiteSection, site_section=>site_section.individualOffers,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'site_section_id'})
    siteSection:Promise<SiteSection | null>;

    @RelationId((individual_offer: IndividualOffer) => individual_offer.siteSection)
    siteSectionId: Promise<number[]>;

    @Column("text",{ 
        nullable:false,
        name:"ind_offer_name"
        })
    indOfferName:string;
        

    @Column("text",{ 
        nullable:true,
        name:"ind_offer_slug"
        })
    indOfferSlug:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"ind_offer_img_small"
        })
    indOfferImgSmall:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"ind_offer_img_big"
        })
    indOfferImgBig:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"ind_offer_priority"
        })
    indOfferPriority:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"ind_offer_status"
        })
    indOfferStatus:string | null;
        
}
