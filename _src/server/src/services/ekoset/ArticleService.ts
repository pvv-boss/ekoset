import * as path from 'path';
import * as fs from 'fs';
import * as slugify from '@sindresorhus/slugify';
import BaseService from '../BaseService';
import PgUtls from '@/utils/PgUtils';
import { Article } from '@/entities/ekoset/Article';
import TypeOrmManager from '@/utils/TypeOrmManager';
import Base64 from '@/utils/Base64';
import { logger } from '@/utils/Logger';
import AppConfig from '@/utils/Config';
import * as cuid from 'cuid';

export default class ArticleService extends BaseService {

  private regexp = /<img\ssrc="data:image\/([a-z]*?)\;base64\,(.*?=)".*?>/gm;

  private apiViewName = 'v_api_article';
  private apiRelatedViewName = 'v_api_related_article';

  public async getAll (published = 1) {
    return this.getDbViewResult(this.apiViewName, null, 'article_status = $1', [published]);
  }

  public async getWithoutSection (published = 1) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id IS NULL AND article_status = $1', [published]);
  }

  public async getBySiteSection (siteSectionId: number, published = 1) {
    return this.getDbViewResult(this.apiViewName, null, 'site_section_id = $1 AND article_status = $2', [siteSectionId, published]);
  }

  public async getById (id: number) {
    return this.getOneById(this.apiViewName, 'article_id = $1', id);
  }

  public async getRelated (id: number, published = 1) {
    return this.getDbViewResult(this.apiRelatedViewName, null, 'main_article_id =$1 AND article_status = $2', [id, published]);
  }

  public async save (article: Article) {
    article.articlePublishDate = new Date(Date.now()).toUTCString();
    try {
      // Заменяем встроенные картинки Base64 на URL
      article.articleBody = await this.createImageFromBase64AndReplaceSrc(article.articleBody);
      article.articleSlug = slugify(article.articleTitle);
      article.siteSection = Promise.resolve(article.siteSectionId);
      return TypeOrmManager.EntityManager.save(article);
    } catch (err) {
      logger.error(err);
      return Promise.reject(err);
    }
  }

  public async publish (id: number) {
    const update = 'UPDATE article SET article_status = 1 WHERE article_id=$1';
    return PgUtls.execNone(update, id);
  }

  public async unpublish (id: number) {
    const update = 'UPDATE article SET article_status = 0 WHERE article_id=$1';
    return PgUtls.execNone(update, id);
  }

  public async moveToSiteSection (id: number, siteSectionId: number) {
    const update = 'UPDATE article SET site_section_id = $1 WHERE article_id=$2';
    return PgUtls.execNone(update, siteSectionId, id);
  }

  public async delete (id: number) {
    return this.deleteById(this.apiViewName, 'article_id = $1', id);
  }

  private async createImageFromBase64AndReplaceSrc (articleBody: string) {
    let result = articleBody;
    const match = this.regexp.exec(articleBody);

    if (match) {
      const ext = match[1];
      const base64 = match[2];

      const pathName = path.resolve('static', 'news');
      const fileName = `img_${cuid()}.${ext}`;
      const filePath = path.resolve(pathName, fileName);
      if (!fs.existsSync(pathName)) {
        fs.mkdirSync(pathName);
      }

      try {
        await Base64.decode(base64, filePath);
        const imageSrc = `/img/news/${fileName}`;
        result = articleBody.replace(`data:image/${ext};base64,`, '').replace(base64, imageSrc)
      } catch (err) {
        logger.error(err);
      }
    }
    return result;
  }

}
