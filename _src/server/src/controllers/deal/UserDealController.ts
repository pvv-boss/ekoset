import { Request, Response } from 'express';
import { BaseController, ServiceRegistry } from 'rsn-express-core';
import UserDealService from '@/services/ekoset/UserDealService';
import { JsonController, Get, Res, Param, Req, Body, Put, Delete, Post } from 'routing-controllers';

@JsonController('/user')
export default class UserDealController extends BaseController {

    @Get('/deal/contracts')
    public async getContracts (
        @Req() request: Request,
        @Res() response: Response) {

        const result = await ServiceRegistry.instance.getService(UserDealService).getContracts();
        return this.createSuccessResponse(result, response);
    }
}
