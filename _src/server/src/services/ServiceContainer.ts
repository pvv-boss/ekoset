
import UserService from './user/UserService';
import AuthService from './user/AuthService';
import UserSessionService from './user/UserSessionService';
import PassportProviders from './user/PassportProviders';
import AuthEmailService from './user/AuthEmailService';
import ArticleService from './ekoset/ArticleService';
import MainEkosetService from './ekoset/MainEkosetService';
import IndividualOfferService from './ekoset/IndividualOfferService';
import BusinessServiceService from './ekoset/BusinessServiceService';
import SeoService from './ekoset/SeoService';

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
  public static SeoService: SeoService = new SeoService();
}

export default ServiceContainer;
