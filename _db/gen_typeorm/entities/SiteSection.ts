import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Article} from "./Article";
import {BusinessService} from "./BusinessService";
import {IndividualOffer} from "./IndividualOffer";
import {ClBrand} from "./ClBrand";


@Entity("site_section",{schema:"brc_ekoset" } )
@Index("site_section_pk",["siteSectionId",],{unique:true})
export class SiteSection {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"site_section_id"
        })
    siteSectionId:number;
        

    @Column("text",{ 
        nullable:false,
        name:"site_section_name"
        })
    siteSectionName:string;
        

    @Column("text",{ 
        nullable:true,
        name:"site_section_slug"
        })
    siteSectionSlug:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"site_section_img_big"
        })
    siteSectionImgBig:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"site_section_img_small"
        })
    siteSectionImgSmall:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"site_section_priority"
        })
    siteSectionPriority:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"site_section_status"
        })
    siteSectionStatus:string | null;
        

   
    @OneToMany(type=>Article, article=>article.siteSection,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    articles:Promise<Article[]>;
    

   
    @OneToMany(type=>BusinessService, business_service=>business_service.siteSection,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    businessServices:Promise<BusinessService[]>;
    

   
    @OneToMany(type=>IndividualOffer, individual_offer=>individual_offer.siteSection,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    individualOffers:Promise<IndividualOffer[]>;
    

   
    @ManyToMany(type=>ClBrand, cl_brand=>cl_brand.siteSections,{  nullable:false, })
    @JoinTable({ name:'site_section_brand'})
    clBrands:Promise<ClBrand[]>;
    
    @RelationId((site_section: SiteSection) => site_section.clBrands)
    clBrandsId: Promise<undefined[]>;
}
