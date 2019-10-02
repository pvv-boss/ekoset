import { BaseController } from './BaseController';
import { Response } from 'express';
import ClientAppConfig from '@/ClientAppConfig';
import AppConfig from '@/utils/Config';
import { DisplayFormatType } from '@/entities/DisplayFormatType';
import { JsonController, Get, Res, createParamDecorator, getMetadataArgsStorage, UseBefore } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { authorized } from '@/middlewares/AuthorizeMiddleware';
import RgisService from '@/services/RgisService';

@JsonController('/app')
export default class AppController extends BaseController {

  @Get('/client/config')
  public async getClientAppConfig (@Res() response: Response) {
    return BaseController.createSuccessResponse(ClientAppConfig, response);
  }

  @UseBefore(authorized())
  @Get('/spec')
  public async getApiSpec (@Res() response: Response) {
    const storage1 = getMetadataArgsStorage();
    const options = {
      defaultErrorHandler: true,
      routePrefix: AppConfig.serverConfig.restApiEndPoint
    }
    // const spec = routingControllersToSpec(storage1, options);
    // return BaseController.createSuccessResponse(spec, response);
  }

  @Get('/rgis')
  public async Rgis (@Res() response: Response) {
    new RgisService().start();
    return BaseController.createSuccessResponse('', response);
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
