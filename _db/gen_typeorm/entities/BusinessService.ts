import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {SiteSection} from "./SiteSection";
import {BusinessServiceClClient} from "./BusinessServiceClClient";
import {ClBrand} from "./ClBrand";
import {ClActivity} from "./ClActivity";
import {Article} from "./Article";


@Entity("business_service",{schema:"brc_ekoset" } )
@Index("business_service_pk",["businessServiceId",],{unique:true})
@Index("relationship_8_fk",["siteSection",])
export class BusinessService {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"business_service_id"
        })
    businessServiceId:number;
        

   
    @ManyToOne(type=>SiteSection, site_section=>site_section.businessServices,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'site_section_id'})
    siteSection:Promise<SiteSection | null>;

    @RelationId((business_service: BusinessService) => business_service.siteSection)
    siteSectionId: Promise<number[]>;

    @Column("text",{ 
        nullable:false,
        name:"business_service_name"
        })
    businessServiceName:string;
        

    @Column("text",{ 
        nullable:true,
        name:"business_service_slug"
        })
    businessServiceSlug:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"business_service_unit"
        })
    businessServiceUnit:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"business_service_price"
        })
    businessServicePrice:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"business_service_img_small"
        })
    businessServiceImgSmall:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"business_service_img_big"
        })
    businessServiceImgBig:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        default: () => "0",
        name:"business_service_status"
        })
    businessServiceStatus:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"business_service_priority"
        })
    businessServicePriority:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        name:"business_service_parent_id"
        })
    businessServiceParentId:string | null;
        

   
    @OneToMany(type=>BusinessServiceClClient, business_service_cl_client=>business_service_cl_client.businessService,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    businessServiceClClients:Promise<BusinessServiceClClient[]>;
    

   
    @OneToMany(type=>ClBrand, cl_brand=>cl_brand.businessService,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    clBrands:Promise<ClBrand[]>;
    

   
    @ManyToMany(type=>ClActivity, cl_activity=>cl_activity.businessServices)
    clActivitys:Promise<ClActivity[]>;
    

   
    @ManyToMany(type=>Article, article=>article.businessServices,{  nullable:false, })
    @JoinTable({ name:'business_service_article'})
    articles:Promise<Article[]>;
    
    @RelationId((business_service: BusinessService) => business_service.articles)
    articlesId: Promise<undefined[]>;
}
