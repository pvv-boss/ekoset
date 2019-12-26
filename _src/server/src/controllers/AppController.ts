import { BaseController } from './BaseController';
import { Response } from 'express';
import ClientAppConfig from '@/ClientAppConfig';
import AppConfig from '@/utils/Config';
import { DisplayFormatType } from '@/entities/DisplayFormatType';
import { JsonController, Get, Res, createParamDecorator, getMetadataArgsStorage, UseBefore, Post, Param, Put, Body } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { authorized } from '@/middlewares/AuthorizeMiddleware';
import RgisService from '@/services/RgisService';
import { ActionMetadataArgs } from 'routing-controllers/metadata/args/ActionMetadataArgs';
import ProxyService from '@/services/ProxyService';
import ServiceContainer from '@/services/ServiceContainer';

@JsonController('/app')
export default class AppController extends BaseController {

  @Get('/client/config')
  public async getClientAppConfig (@Res() response: Response) {
    return BaseController.createSuccessResponse(ClientAppConfig, response);
  }

  @UseBefore(authorized())
  @Get('/spec')
  public async getApiSpec (@Res() response: Response) {
    const storage = getMetadataArgsStorage();
    const options = {
      defaultErrorHandler: true,
      routePrefix: AppConfig.serverConfig.restApiEndPoint
    }
    // const spec = routingControllersToSpec(storage as MetadataArgsStorage, options);
    // return BaseController.createSuccessResponse(spec, response);
  }

  @Get('/rgis')
  public async Rgis (@Res() response: Response) {
    new RgisService().start();
    return BaseController.createSuccessResponse('', response);
  }

  @Post('/admin/proxy/list')
  public async updateProxies (@Res() response: Response) {
    ServiceContainer.ProxyService.updateProxies();
    return BaseController.createSuccessResponse({}, response);
  }

  @Get('/admin/proxy/list')
  public async getProxies (@Res() response: Response) {
    const result = await ServiceContainer.ProxyService.getProxies();
    return BaseController.createSuccessResponse(result, response);
  }

  @Put('/admin/proxy/request')
  public async sendRequest (
    @Res() response: Response,
    @Body() requestInfo: any,
  ) {
    const result = await ServiceContainer.ProxyService.sendRequest(requestInfo);
    return BaseController.createSuccessResponse(result, response);
  }

  @Get('/admin/proxy/test')
  public async testRequest (@Res() response: Response) {
    const requestInfo: any = {};
    requestInfo.url = 'http://npobaltros.ru/';
    const result = await ServiceContainer.ProxyService.sendRequest(requestInfo);
    return BaseController.createSuccessResponse(result, response);
  }


}

export const DisplayFormatTypeFromRequest = (options?: { required?: boolean }) => {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: (action) => {
      return action.request.query.format === DisplayFormatType.Grid ? DisplayFormatType.Grid : DisplayFormatType.Tile;
    }
  })
}

export const SortFilterPaginationFromRequest = (options?: { required?: boolean }) => {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: (action) => {
      return {
        sort: {
          sortField: action.request.query.sortfield || null,
          sortType: action.request.query.sorttype || 'DESC'
        },
        pagination:
        {
          offset: (action.request.query.offset != null && action.request.query.offset !== 'undefined') ? action.request.query.offset : 0,
          limit: (action.request.query.limit != null && action.request.query.limit !== 'undefined') ? action.request.query.limit : 20
        },
      };
    }
  })
}
