import { BaseController } from '../BaseController';
import { JsonController } from 'routing-controllers/decorator/JsonController';
import { BodyParam, Req, Res, Get } from 'routing-controllers';
import { Request, Response } from 'express';
import ServiceContainer from '@/services/ServiceContainer';

@JsonController('/user')
export default class UserDealController extends BaseController {

    @Get('/deal/contracts')
    public async getContracts (
        @Req() request: Request,
        @Res() response: Response) {

        const result = await ServiceContainer.UserDealService.getContracts();
        return UserDealController.createSuccessResponse(result, response);
    }
}
