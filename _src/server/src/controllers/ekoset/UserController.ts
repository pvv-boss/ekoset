import IndividualOfferService from '@/services/ekoset/IndividualOfferService';
import { Body, Get, JsonController, Param, Post, Req, Res, UseBefore } from 'routing-controllers';
import { authorized, BaseController, ClientNotifyMessage, ServiceRegistry } from 'rsn-express-core';
import { Response, Request } from 'express';
import UserService from '@/services/ekoset/UserService';
import EkosetClient from '@/entities/ekoset/EkosetClient';

@JsonController()
export default class UserController extends BaseController {

    @UseBefore(authorized())
    @Get('/personal/user/:id')
    public async getApplicationUserById (
        @Res() response: Response,
        @Param('id') id: number
    ) {
        const result = await ServiceRegistry.instance.getService(UserService).getClientByAppUserId(id);
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Post('/personal/user')
    public async save (
        @Body() client: EkosetClient,
        @Res() response: Response) {

        const result = await ServiceRegistry.instance.getService(UserService).save(client)

        return this.createSuccessResponseWithMessage({}, response, 200, ClientNotifyMessage.createAlert('ЭКОСЕТЬ', 'Данные Аккаунта сохранены'))
    }
}