import {
  JsonController,
  Get,
  Res,
  Param,
  Req,
  Body,
  Put,
  Delete,
  Post,
} from "routing-controllers";
import { Request, Response } from "express";
import { Article } from "@/entities/ekoset/Article";
import { ClArticleTag } from "@/entities/ekoset/ClArticleTag";
import {
  BaseController,
  NotFound,
  ServiceRegistry,
  SortPagination,
  sortPaginationFromRequest,
} from "rsn-express-core";
import ArticleService from "@/services/ekoset/ArticleService";

@JsonController()
export default class ArticleController extends BaseController {
  @Get("/admin/panel/news")
  public async adminGetAll(@Res() response: Response) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .adminGetAll();
    return this.createSuccessResponse(result, response);
  }

  @Get("/admin/panel/news/:artcicleId(\\d+)/:siteSectionId/service")
  public async adminGetServiceRelation(
    @Res() response: Response,
    @Param("siteSectionId") siteSectionId: number,
    @Param("artcicleId") artcicleId: number
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .adminGetServiceRelation(siteSectionId, artcicleId);
    return this.createSuccessResponse(result, response);
  }

  @Put("/admin/panel/news/:artcicleId/service/:serviceId")
  public async adminAddServiceRelation(
    @Res() response: Response,
    @Param("serviceId") serviceId: number,
    @Param("artcicleId") artcicleId: number
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .adminAddServiceRelation(serviceId, artcicleId);
    return this.createSuccessResponse(result, response);
  }

  @Delete("/admin/panel/news/:artcicleId/service/:serviceId")
  public async adminRemoveServiceRelation(
    @Param("artcicleId") artcicleId: number,
    @Param("serviceId") serviceId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .adminRemoveServiceRelation(serviceId, artcicleId);
    return this.createSuccessResponse(result, response);
  }

  @Get("/admin/panel/news/:artcicleId(\\d+)/tags")
  public async getArticleTagsRelation(
    @Res() response: Response,
    @Param("artcicleId") artcicleId: number
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getArticleTagsRelation(artcicleId);
    return this.createSuccessResponse(result, response);
  }

  @Get("/admin/panel/news/tags")
  public async getAllArticleTags(@Res() response: Response) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getAllArticleTags();
    return this.createSuccessResponse(result, response);
  }

  @Post("/admin/panel/news/:artcicleId/tags/:tagId")
  public async adminAddArticleTag(
    @Param("tagId") tagId: number,
    @Param("artcicleId") artcicleId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .adminAddArticleTag(artcicleId, tagId);
    return this.createSuccessResponse(result, response);
  }

  @Post("/admin/panel/news/tags")
  public async saveArticleTag(
    @Body() clArticleTag: ClArticleTag,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .saveArticleTag(clArticleTag);
    return this.createSuccessResponse(result, response);
  }

  @Delete("/admin/panel/news/:artcicleId/tags/:tagId")
  public async adminRemoveArticleTag(
    @Param("tagId") tagId: number,
    @Param("artcicleId") artcicleId: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .adminDeleteArticleTag(artcicleId, tagId);
    return this.createSuccessResponse(result, response);
  }

  @Get("/news")
  public async getRootArticles(
    @Res() response: Response,
    @sortPaginationFromRequest() sortFilterPang: SortPagination
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getForHomePage(sortFilterPang);
    return this.createSuccessResponse(result, response);
  }

  @Get("/:sitesection/news")
  public async getArticlesBySiteSection(
    @Res() response: Response,
    @Param("sitesection") siteSectionId: number,
    @sortPaginationFromRequest() sortFilterPang: SortPagination
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getBySiteSection(siteSectionId, sortFilterPang);
    return this.createSuccessResponse(result, response);
  }

  @Get("/:sitesection/news/count")
  public async getArticlesCountSiteSection(
    @Res() response: Response,
    @Param("sitesection") siteSectionId: number
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getCountBySiteSection(siteSectionId);
    return this.createSuccessResponse(result, response);
  }

  @Get("/news/count")
  public async getRootArticlesCount(@Res() response: Response) {
    const result = ServiceRegistry.instance
      .getService(ArticleService)
      .getRootArticlesCount();
    return this.createSuccessResponse(result, response);
  }

  @Get("/services/:service(\\d+)/news")
  public async getByBusinessService(
    @Res() response: Response,
    @Param("service") serviceId: number,
    @sortPaginationFromRequest() sortFilterPang: SortPagination
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getByBusinessService(serviceId, sortFilterPang);
    return this.createSuccessResponse(result, response);
  }

  @Get("/news/:id(\\d+)")
  public async getArticlesById(
    @Req() request: Request,
    @Res() response: Response,
    @Param("id") id: number
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getById(id);
    if (!!result) {
      return this.createSuccessResponse(result, response);
    } else {
      return this.createFailureResponse(
        new NotFound(request.originalUrl),
        response
      );
    }
  }

  @Get("/news/:id(\\d+)/related")
  public async getRelatedArticlesListById(
    @Res() response: Response,
    @Param("id") id: number
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getRelated(id);
    return this.createSuccessResponse(result, response);
  }

  @Get("/news/:id(\\d+)/tags")
  public async getArticleTags(
    @Res() response: Response,
    @Param("id") id: number
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .getArticleTags(id);
    return this.createSuccessResponse(result, response);
  }

  @Put("/news")
  public async saveArticle(
    @Body() article: Article,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .save(article);
    return this.createSuccessResponse(result, response);
  }

  @Delete("/news/:id(\\d+)")
  public async deleteArticle(
    @Param("id") id: number,
    @Res() response: Response
  ) {
    const result = await ServiceRegistry.instance
      .getService(ArticleService)
      .delete(id);
    return this.createSuccessResponse(result, response);
  }
}
