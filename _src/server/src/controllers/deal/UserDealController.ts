import { Request, Response } from "express";
import { authorized, BaseController, ClientNotifyMessage, SecurityHelper, ServiceRegistry, Unauthorized } from "rsn-express-core";
import UserDealService from "@/services/ekoset/UserDealService";
import { JsonController, Get, Res, Param, Req, Body, Put, Delete, Post, UseBefore } from "routing-controllers";
import Work from "@/entities/deal/Work";
import UserService from "@/services/ekoset/UserService";
import DesWork from "@/entities/ekoset/DesWork";

@JsonController("/user")
export default class UserDealController extends BaseController {
    @UseBefore(authorized())
    @Get("/deal/contracts")
    public async getContracts(@Req() request: Request, @Res() response: Response) {
        const sessionUser = SecurityHelper.getSessionUserFromToken(request);

        if (!!sessionUser) {
            const result = await ServiceRegistry.instance.getService(UserDealService).getContracts(sessionUser.appUserId);
            return this.createSuccessResponse(result, response);
        } else {
            return this.createFailureResponse(new Unauthorized(), response);
        }
    }

    @UseBefore(authorized())
    @Get("/deal/labaratory")
    public async getLabaratoryList(@Req() request: Request, @Res() response: Response) {
        const sessionUser = SecurityHelper.getSessionUserFromToken(request);

        if (!!sessionUser) {
            const result = await ServiceRegistry.instance.getService(UserDealService).getLabaratoryList(sessionUser.appUserId);
            return this.createSuccessResponse(result, response);
        } else {
            return this.createFailureResponse(new Unauthorized(), response);
        }
    }

    @UseBefore(authorized())
    @Get("/deal/deswork")
    public async getDesworkList(@Req() request: Request, @Res() response: Response) {
        const sessionUser = SecurityHelper.getSessionUserFromToken(request);

        if (!!sessionUser) {
            const result = await ServiceRegistry.instance.getService(UserDealService).getDesworkList(sessionUser.appUserId);
            return this.createSuccessResponse(result, response);
        } else {
            return this.createFailureResponse(new Unauthorized(), response);
        }
    }

    @UseBefore(authorized())
    @Get("/deal/deswork/:id")
    public async getDesworkById(@Req() request: Request, @Res() response: Response, @Param("id") dezWorkId?: number) {
        const sessionUser = SecurityHelper.getSessionUserFromToken(request);

        if (!!sessionUser) {
            const result = await ServiceRegistry.instance.getService(UserDealService).getDesworkById(dezWorkId);
            return this.createSuccessResponse(result, response);
        } else {
            return this.createFailureResponse(new Unauthorized(), response);
        }
    }

    @UseBefore(authorized())
    @Put("/deal/deswork")
    public async saveDeswork(@Req() request: Request, @Res() response: Response, @Body() work: DesWork) {
        const result = await ServiceRegistry.instance.getService(UserService).saveDeswork(work);
        return this.createSuccessResponseWithMessage(
            {},
            response,
            200,
            ClientNotifyMessage.createAlert(
                " Оценка работы мастера ",
                "Спасибо за объективную оценку нашей работы. Это помогает нам делать сервис лучше !"
            )
        );
    }

    @UseBefore(authorized())
    @Get("/deal/sandocs")
    public async getSanDocsList(@Req() request: Request, @Res() response: Response) {
        const sessionUser = SecurityHelper.getSessionUserFromToken(request);

        if (!!sessionUser) {
            const result = await ServiceRegistry.instance.getService(UserDealService).getSanDocsList(sessionUser.appUserId);
            return this.createSuccessResponse(result, response);
        } else {
            return this.createFailureResponse(new Unauthorized(), response);
        }
    }
}
