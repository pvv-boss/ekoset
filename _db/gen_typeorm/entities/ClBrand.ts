import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {BusinessService} from "./BusinessService";
import {SiteSection} from "./SiteSection";


@Entity("cl_brand",{schema:"brc_ekoset" } )
@Index("business_service_brand_fk",["businessService",])
@Index("cl_brand_pk",["clBrandId",],{unique:true})
export class ClBrand {

    @PrimaryGeneratedColumn({
        type:"integer", 
        name:"cl_brand_id"
        })
    clBrandId:number;
        

   
    @ManyToOne(type=>BusinessService, business_service=>business_service.clBrands,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'business_service_id'})
    businessService:Promise<BusinessService | null>;

    @RelationId((cl_brand: ClBrand) => cl_brand.businessService)
    businessServiceId: Promise<number[]>;

    @Column("text",{ 
        nullable:true,
        name:"cl_brand_name"
        })
    clBrandName:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_brand_img_small"
        })
    clBrandImgSmall:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_brand_img_big"
        })
    clBrandImgBig:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"cl_brand_url"
        })
    clBrandUrl:string | null;
        

    @Column("numeric",{ 
        nullable:true,
        precision:1,
        scale:0,
        name:"cl_brand_priority"
        })
    clBrandPriority:string | null;
        

   
    @ManyToMany(type=>SiteSection, site_section=>site_section.clBrands)
    siteSections:Promise<SiteSection[]>;
    
}
