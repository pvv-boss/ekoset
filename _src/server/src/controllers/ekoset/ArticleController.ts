import { JsonController, Get, Res, Param, Req, Body, Put, Delete } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { Article } from '@/entities/ekoset/Article';

@JsonController()
export default class ArticleController extends BaseController {

  @Get('/:sitesection/news')
  public async getArticleListBySiteSection (
    @Res() response: Response,
    @Param('sitesection') siteSectionId: number) {

    const result = await ServiceContainer.ArticleService.getBySiteSection(siteSectionId);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/news')
  public async getRootArticle (
    @Res() response: Response
  ) {

    const result = await ServiceContainer.ArticleService.getWithoutSection();
    return ArticleController.createSuccessResponse(result, response);
  }

  @Get('/news/:id(\\d+)')
  public async getArticleById (
    @Res() response: Response,
    @Param('id') id: number) {

    const result = await ServiceContainer.ArticleService.getById(id);
    return ArticleController.createSuccessResponse(result, response);
  }


  @Get('/news/:id(\\d+)/related')
  public async getRelatedArticleListById (
    @Res() response: Response,
    @Param('id') id: number) {

    const result = await ServiceContainer.ArticleService.getRelated(id);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Put('/:sitesection/news')
  public async saveArticleForSection (
    @Param('sitesection') siteSectionId: number,
    @Body() article: Article,
    @Res() response: Response) {

    const result = await ServiceContainer.ArticleService.save(siteSectionId, article);
    return ArticleController.createSuccessResponse(result, response);
  }

  @Put('/news')
  public async saveArticle (
    @Body() article: Article,
    @Res() response: Response) {

    const result = await ServiceContainer.ArticleService.save(0, article);
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
