import { JsonController, Get, Res, Param, Req, Body, Put, Delete } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { Article } from '@/entities/ekoset/Article';
import { NotFound } from '@/exceptions/clientErrors/NotFound';
import SortFilterPagination from '@/entities/SortFilterPagination';
import { SortFilterPaginationFromRequest } from '../AppController';

@JsonController()
export default class ArticleController extends BaseController {

  @Get('/admin/panel/news')
  public async adminGetAll (
    @Res() response: Response
  ) {
    const result = await ServiceContainer.ArticleService.adminGetAll();
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/news')
  public async getRootArticles (
    @Res() response: Response,
    @SortFilterPaginationFromRequest() sortFilterPang: SortFilterPagination

  ) {

    const result = await ServiceContainer.ArticleService.getForHomePage(sortFilterPang);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/news')
  public async getArticlesBySiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number,
    @SortFilterPaginationFromRequest() sortFilterPang: SortFilterPagination) {

    const result = await ServiceContainer.ArticleService.getBySiteSection(siteSectionId, sortFilterPang);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/:sitesection/news/count')
  public async getArticlesCountSiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {

    const result = await ServiceContainer.ArticleService.getCountBySiteSection(siteSectionId);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/news/count')
  public async getRootArticlesCount (
    @Res() response: Response) {

    const result = await ServiceContainer.ArticleService.getRootArticlesCount();
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/services/:service(\\d+)/news')
  public async getByBusinessService (
    @Res() response: Response,
    @Param('service') serviceId: number,
    @SortFilterPaginationFromRequest() sortFilterPang: SortFilterPagination) {

    const result = await ServiceContainer.ArticleService.getByBusinessService(serviceId, sortFilterPang);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/news/:id(\\d+)')
  public async getArticlesById (
    @Req() request: Request,
    @Res() response: Response,
    @Param('id') id: number) {

    const result = await ServiceContainer.ArticleService.getById(id);
    if (!!result) {
      return ArticleController.createSuccessResponse(result, response);
    } else {
      return ArticleController.createFailureResponse(new NotFound(request.originalUrl), response)
    }
  }


  @Get('/news/:id(\\d+)/related')
  public async getRelatedArticlesListById (
    @Res() response: Response,
    @Param('id') id: number) {

    const result = await ServiceContainer.ArticleService.getRelated(id);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Put('/news')
  public async saveArticle (
    @Body() article: Article,
    @Res() response: Response) {

    const result = await ServiceContainer.ArticleService.save(article);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Delete('/news/:id(\\d+)')
  public async deleteArticle (
    @Param('id') id: number,
    @Res() response: Response) {

    const result = await ServiceContainer.ArticleService.delete(id);
    return ArticleController.createSuccessResponse(result, response);
  }
}
