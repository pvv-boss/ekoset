import AppController from './AppController';
import AuthController from './user/AuthController';
import UserController from './user/UserController';
import ArticleController from './ekoset/ArticleController';
import MainEkosetController from './ekoset/MainEkosetController';
import IndividualOfferController from './ekoset/IndividualOfferController';
import BusinessServiceController from './ekoset/BusinessServiceController';
import SeoController from './ekoset/SeoController';


export const appControllers = [AppController, AuthController, UserController, ArticleController, BusinessServiceController, IndividualOfferController, MainEkosetController, SeoController]
