import { AppUser } from '@/entities/users/AppUser';
import { AppUserSession } from '@/entities/users/AppUserSession';
import { AppUserSocialNetProfile } from '@/entities/users/AppUserSocialNetProfile';
import { Article } from './ekoset/Article';
import { RelatedArticle } from './ekoset/RelatedArticle';
import { SiteSection } from './ekoset/SiteSection';



const entityModelMetadata = [
  AppUser, AppUserSession, AppUserSocialNetProfile, Article, RelatedArticle, SiteSection
];

export default entityModelMetadata;



