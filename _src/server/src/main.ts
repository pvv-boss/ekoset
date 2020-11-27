import entityModelMetadata from '@/entities/index'
import UserDealController from './controllers/deal/UserDealController';
import ArticleController from './controllers/ekoset/ArticleController';
import BusinessServiceController from './controllers/ekoset/BusinessServiceController';
import CmsController from './controllers/ekoset/CmsController';
import IndividualOfferController from './controllers/ekoset/IndividualOfferController';
import MainEkosetController from './controllers/ekoset/MainEkosetController';
import MediaController from './controllers/ekoset/MediaController';
import PriceController from './controllers/ekoset/PriceController';
import UserRequestController from './controllers/ekoset/UserRequestController';
import CMSService from './services/CMSService';
import ArticleService from './services/ekoset/ArticleService';
import BusinessServiceService from './services/ekoset/BusinessServiceService';
import IndividualOfferService from './services/ekoset/IndividualOfferService';
import MainEkosetService from './services/ekoset/MainEkosetService';
import MediaService from './services/ekoset/MediaService';
import UserDealService from './services/ekoset/UserDealService';
import { UserRequestService } from './services/ekoset/UserRequestService';
import { ExpressApplication, logger, ServiceRegistry } from 'rsn-express-core';
import UserService from './services/ekoset/UserService';
import UserController from './controllers/ekoset/UserController';


(async () => {

    const app: ExpressApplication = new ExpressApplication();

    app.addAppControllers([ArticleController, MainEkosetController, IndividualOfferController, BusinessServiceController,
        MediaController, CmsController, PriceController, UserRequestController, UserDealController, UserController]);

    ServiceRegistry.instance.register(ArticleService);
    ServiceRegistry.instance.register(MainEkosetService);
    ServiceRegistry.instance.register(IndividualOfferService);
    ServiceRegistry.instance.register(BusinessServiceService);
    ServiceRegistry.instance.register(MediaService);
    ServiceRegistry.instance.register(CMSService);
    ServiceRegistry.instance.register(UserRequestService);
    ServiceRegistry.instance.register(UserDealService);
    ServiceRegistry.instance.register(UserService);

    app.addTypeOrmEntityMetadata([...entityModelMetadata]);


    ServiceRegistry.instance.getService(UserService).initUserConnection();

    await app.start();

    process.on('uncaughtException', (err) => {
        logger.error(err);
        process.exit(1);
    })
}
)()