import { Request, Response } from 'express';
import { authorized, BaseController, postgresWrapper, SecurityHelper, ServiceRegistry, Unauthorized } from 'rsn-express-core';
import UserDealService from '@/services/ekoset/UserDealService';
import { JsonController, Get, Res, Param, Req, Body, Put, Delete, Post, UseBefore } from 'routing-controllers';
import multer from 'multer';
import MediaService from '@/services/ekoset/MediaService';

const upload = multer();

@JsonController('/admin')
export default class StaffClientController extends BaseController {

    @UseBefore(authorized())
    @Get('/staff/managers')
    public async getManagers (
        @Req() request: Request,
        @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserDealService).getManagers();
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Get('/staff/clients')
    public async getClients (
        @Req() request: Request,
        @Res() response: Response) {

        const result = await ServiceRegistry.instance.getService(UserDealService).getClients();
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(upload.single('file'))
    @Post('/staff/manager/foto/:id')
    public async addManagerFoto (
        @Param('id') id: number,
        @Req() request: Request,
        @Res() response: Response
    ) {

        const file = request.file;
        const pathAndFileName = await ServiceRegistry.instance.getService(MediaService).saveFileFromRequestBody(file, 'img', 'managers', id.toString(), false);
        return this.createSuccessResponse(pathAndFileName[0], response);
    }

    @UseBefore(authorized())
    @Get('/user/requests')
    public async getRequests (
        @Req() request: Request,
        @Res() response: Response) {
        const result = await postgresWrapper.anyWhere('v_api_admin_user_request')
        return this.createSuccessResponse(result, response);
    }

}