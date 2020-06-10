import { AppUser } from '@/entities/users/AppUser';
import { AppUserSession } from '@/entities/users/AppUserSession';
import { AppUserSocialNetProfile } from '@/entities/users/AppUserSocialNetProfile';
import { Article } from './ekoset/Article';
import { SiteSection } from './ekoset/SiteSection';
import { BusinessService } from './ekoset/BusinessService';
import { ClActivityType } from './ekoset/ClActivityType';
import { ClArticleTag } from './ekoset/ClArticleTag';
import { ClBrand } from './ekoset/ClBrand';
import { ClSiteSetting } from './ekoset/ClSiteSetting';
import { IndividualOffer } from './ekoset/IndividualOffer';
import { SiteSocialNetwork } from './ekoset/SiteSocialNetwork';
import { ClClient } from './ekoset/ClClient';
import { ReccomendationLetter } from './ekoset/ReccomendationLetter';
import SitePage from './ekoset/SitePage';
import { UserRequest } from './ekoset/UserRequest';
import { UserRequestFile } from './ekoset/UserRequestFile';
import SiteDocument from './ekoset/SiteDocument';


const entityModelMetadata = [
  SiteSection, AppUser, AppUserSession, AppUserSocialNetProfile, Article, BusinessService, ClArticleTag, ClBrand
  , ClSiteSetting, IndividualOffer, SiteSocialNetwork, ClClient, ReccomendationLetter, SitePage, UserRequest, UserRequestFile, ClActivityType, SiteDocument
];



export default entityModelMetadata;



