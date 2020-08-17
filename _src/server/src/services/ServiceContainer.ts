
import UserService from './user/UserService';
import AuthService from './user/AuthService';
import UserSessionService from './user/UserSessionService';
import PassportProviders from './user/PassportProviders';
import AuthEmailService from './user/AuthEmailService';
import ArticleService from './ekoset/ArticleService';
import MainEkosetService from './ekoset/MainEkosetService';
import IndividualOfferService from './ekoset/IndividualOfferService';
import BusinessServiceService from './ekoset/BusinessServiceService';
import MediaService from './ekoset/MediaService';
import CMSService from './CMSService';
import { UserRequestService } from './ekoset/UserRequestService';
import UserDealService from './ekoset/UserDealService';

class ServiceContainer {
  public static UserService: UserService = new UserService();
  public static UserSessionService: UserSessionService = new UserSessionService();
  public static AuthService: AuthService = new AuthService();
  public static PassportProviders: PassportProviders = new PassportProviders();
  public static AuthEmailService: AuthEmailService = new AuthEmailService();

  public static ArticleService: ArticleService = new ArticleService();
  public static MainEkosetService: MainEkosetService = new MainEkosetService();
  public static IndividualOfferService: IndividualOfferService = new IndividualOfferService();
  public static BusinessServiceService: BusinessServiceService = new BusinessServiceService();
  public static MediaService: MediaService = new MediaService();
  public static CMSService: CMSService = new CMSService();

  public static UserRequestService: UserRequestService = new UserRequestService();

  public static UserDealService: UserDealService = new UserDealService();

}

export default ServiceContainer;
