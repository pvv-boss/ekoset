import { Request, Response } from 'express';
import { authorized, BaseController, SecurityHelper, ServiceRegistry, Unauthorized } from 'rsn-express-core';
import UserDealService from '@/services/ekoset/UserDealService';
import { JsonController, Get, Res, Param, Req, Body, Put, Delete, Post, UseBefore } from 'routing-controllers';

@JsonController('/user')
export default class UserDealController extends BaseController {

    @UseBefore(authorized())
    @Get('/deal/contracts')
    public async getContracts (
        @Req() request: Request,
        @Res() response: Response) {

        const sessionUser = SecurityHelper.getSessionUserFromToken(request);

        if (!!sessionUser) {
            const result = await ServiceRegistry.instance.getService(UserDealService).getContracts(sessionUser.appUserId);
            return this.createSuccessResponse(result, response);
        } else {
            return this.createFailureResponse(new Unauthorized(), response)
        }

    }
}
