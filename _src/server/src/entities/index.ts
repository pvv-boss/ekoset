import { AppUser } from '@/entities/users/AppUser';
import { AppUserSession } from '@/entities/users/AppUserSession';
import { AppUserSocialNetProfile } from '@/entities/users/AppUserSocialNetProfile';
import { Article } from './ekoset/Article';
import { SiteSection } from './ekoset/SiteSection';
import { BusinessService } from './ekoset/BusinessService';
import { ClActivityType } from './ekoset/ClActivityType';
import { ClArticleTag } from './ekoset/ClArticleTag';
import { ClBrand } from './ekoset/ClBrand';
import { ClMetaTag } from './ekoset/ClMetaTag';
import { ClSiteSetting } from './ekoset/ClSiteSetting';
import { IndividualOffer } from './ekoset/IndividualOffer';
import { MetaTagContent } from './ekoset/MetaTagContent';
import { SiteSocialNetwork } from './ekoset/SiteSocialNetwork';
import { ClClient } from './ekoset/ClClient';
import { PartnerGroup } from './ekoset/PartnerGroup';
import { Partner } from './ekoset/Partner';
import { ReccomendationLetter } from './ekoset/ReccomendationLetter';
import SitePage from './ekoset/SitePage';
import { UserRequest } from './ekoset/UserRequest';
import { UserRequestFile } from './ekoset/UserRequestFile';


const entityModelMetadata = [
  AppUser, AppUserSession, AppUserSocialNetProfile, Article, BusinessService, SiteSection, ClArticleTag, ClBrand,
  ClMetaTag, ClSiteSetting, IndividualOffer, MetaTagContent, SiteSocialNetwork, ClClient, PartnerGroup, Partner, ReccomendationLetter, SitePage, UserRequest, UserRequestFile, ClActivityType
];



export default entityModelMetadata;



