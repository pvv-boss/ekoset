import { Request, Response } from "express";
import {
    authorized,
    BaseController,
    ClientNotifyMessage,
    postgresWrapper,
    SecurityHelper,
    ServiceRegistry,
    Unauthorized,
} from "rsn-express-core";
import UserDealService from "@/services/ekoset/UserDealService";
import { JsonController, Get, Res, Param, Req, Body, Put, Delete, Post, UseBefore, BodyParam } from "routing-controllers";
import multer from "multer";
import MediaService from "@/services/ekoset/MediaService";
import UserService from "@/services/ekoset/UserService";
import EkosetManager from "@/entities/ekoset/EkosetManager";

const upload = multer();

@JsonController("/admin")
export default class StaffClientController extends BaseController {
    @UseBefore(authorized())
    @Get("/staff/managers")
    public async getManagers(@Req() request: Request, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserDealService).getManagers();
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Get("/staff/clients")
    public async getClients(@Req() request: Request, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserDealService).getClients();
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(upload.single("file"))
    @Post("/staff/manager/foto/:id")
    public async addManagerFoto(@Param("id") id: number, @Req() request: Request, @Res() response: Response) {
        const file = request.file;
        const pathAndFileName = await ServiceRegistry.instance
            .getService(MediaService)
            .saveFileFromRequestBody(file, "img", "managers", id.toString(), false);
        return this.createSuccessResponse(pathAndFileName[0], response);
    }

    @UseBefore(authorized())
    @Get("/user/requests")
    public async getRequests(@Req() request: Request, @Res() response: Response) {
        const result = await postgresWrapper.anyWhere("v_api_admin_user_request");
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Post("/user/client/activate")
    public async activateEkosetClient(@BodyParam("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserService).activateEkosetClient(id);

        return this.createSuccessResponseWithMessage(
            {},
            response,
            200,
            ClientNotifyMessage.createAlert(" Активация пользователя ", result.message)
        );
    }

    @UseBefore(authorized())
    @Delete("/user/client/:id/deactivate")
    public async deactivateEkosetClient(@Param("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserService).deactivateEkosetClient(id);

        return this.createSuccessResponseWithMessage(
            {},
            response,
            200,
            ClientNotifyMessage.createAlert(" Деактивация пользователя ", "Выполнено!")
        );
    }

    @UseBefore(authorized())
    @Post("/user/admin/activate")
    public async activateEkosetAdmin(@BodyParam("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserService).activateEkosetAdmin(id);

        return this.createSuccessResponseWithMessage(
            {},
            response,
            200,
            ClientNotifyMessage.createAlert(" Активация пользователя ", result.message)
        );
    }

    @UseBefore(authorized())
    @Delete("/user/admin/:id/deactivate")
    public async deactivateEkosetAdmin(@Param("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserService).deactivateEkosetAdmin(id);

        return this.createSuccessResponseWithMessage(
            {},
            response,
            200,
            ClientNotifyMessage.createAlert(" Деактивация пользователя ", "Выполнено!")
        );
    }

    @UseBefore(authorized())
    @Post("/user/admin/manager")
    public async addNewAdminManager(@Body() ekosetManager: EkosetManager, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserService).addNewAdminManager(ekosetManager);

        return this.createSuccessResponseWithMessage(
            {},
            response,
            200,
            ClientNotifyMessage.createAlert(" Создание сотрудника ", "Выполнено!")
        );
    }

    // Для карточки клиента в админке
    @UseBefore(authorized())
    @Get("/deal/:id/contracts")
    public async getContracts(@Req() request: Request, @Param("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserDealService).getContracts(id, true);
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Get("/deal/:id/labaratory")
    public async getLabaratoryList(@Req() request: Request, @Param("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserDealService).getLabaratoryList(id, true);
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Get("/deal/:id/deswork")
    public async getDesworkList(@Req() request: Request, @Param("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserDealService).getDesworkList(id, true);
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Get("/deal/:id/sandocs")
    public async getSanDocsList(@Req() request: Request, @Param("id") id: number, @Res() response: Response) {
        const result = await ServiceRegistry.instance.getService(UserDealService).getSanDocsList(id, true);
        return this.createSuccessResponse(result, response);
    }

    @UseBefore(authorized())
    @Get("/deal/:id/contragents")
    public async getСontragentList(@Req() request: Request, @Param("id") id: number, @Res() response: Response) {
        const result = await postgresWrapper.anyWhere("contragent_view", null, "person_id=$1", [id]);

        return this.createSuccessResponse(result, response);
    }
    @UseBefore(authorized())
    @Get("/user/person/:id")
    public async getPersonById(@Req() request: Request, @Param("id") id: number, @Res() response: Response) {
        const result = await postgresWrapper.anyWhere("admin_client_api_view", null, "person_id=$1", [id]);

        return this.createSuccessResponse(result, response);
    }
}
