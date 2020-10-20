import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import SiteDocument from '@/entities/ekoset/SiteDocument';
import { BaseService, postgresWrapper, TypeOrmManager } from 'rsn-express-core';
import cuid from 'cuid';

export default class MediaService extends BaseService {


  public async getBannersForMainPage () {
    return postgresWrapper.anyWhere('v_api_banner_by_main')
  }

  public async getBannersForSiteSection (siteSectionId: number) {
    return postgresWrapper.anyWhere('v_api_banner_by_section', null, 'site_section_id=$1', [siteSectionId])
  }

  public async saveSiteSectionImage (siteSectionId: number, file: Express.Multer.File, isBig: boolean) {
    const updateStmt = `UPDATE site_section SET site_section_img_${isBig ? 'big' : 'small'} = $1 where site_section_id = ${siteSectionId}`;
    return this.updateSmallOrBigImageFor(file, 'sitesection', `${isBig ? 'big' : 'small'}_${siteSectionId}`, updateStmt);
  }

  public async saveSiteSectionLogo (siteSectionId: number, file: Express.Multer.File) {
    const updateStmt = `UPDATE site_section SET site_section_logo = $1 where site_section_id = ${siteSectionId}`;
    return this.updateSmallOrBigImageFor(file, 'sitesection', `logo_${siteSectionId}`, updateStmt);
  }

  public async saveServiceImage (serviceId: number, file: Express.Multer.File, isBig: boolean) {
    const updateStmt = `UPDATE business_service SET business_service_img_${isBig ? 'big' : 'small'} = $1 where business_service_id = ${serviceId}`;
    return this.updateSmallOrBigImageFor(file, 'service', `${isBig ? 'big' : 'small'}_${serviceId}`, updateStmt);
  }

  public async saveOfferImage (offerId: number, file: Express.Multer.File, isBig: boolean) {
    const updateStmt = `UPDATE individual_offer SET ind_offer_img_${isBig ? 'big' : 'small'} = $1 where ind_offer_id = ${offerId}`;
    return this.updateSmallOrBigImageFor(file, 'offer', `${isBig ? 'big' : 'small'}_${offerId}`, updateStmt);
  }

  public async saveBrandImage (brandId: number, file: Express.Multer.File, isBig: boolean) {
    const updateStmt = `UPDATE cl_brand SET cl_brand_img_${isBig ? 'big' : 'small'} = $1 where cl_brand_id = ${brandId}`;
    return this.updateSmallOrBigImageFor(file, 'brands', `${isBig ? 'big' : 'small'}_${brandId}`, updateStmt);
  }

  public async saveNewsImage (newsId: number, file: Express.Multer.File, isBig: boolean) {
    const updateStmt = `UPDATE article SET article_${isBig ? 'header_img_src' : 'preview_img_src'} = $1 where article_id = ${newsId}`;
    return this.updateSmallOrBigImageFor(file, 'news', `${isBig ? 'big' : 'small'}_${newsId}`, updateStmt);
  }

  public async saveRecommendationLetterImage (brandId: number, file: Express.Multer.File) {
    const updateStmt = `UPDATE cl_brand SET cl_brand_img_big = $1 where cl_brand_id = ${brandId}`;
    return this.updateSmallOrBigImageFor(file, 'letters', `letter_${brandId}`, updateStmt);
  }

  public async saveSitePageImage (sitePageId: number, file: Express.Multer.File) {
    const updateStmt = `UPDATE site_page SET site_page_banner = $1 where site_page_id = ${sitePageId}`;
    return this.updateSmallOrBigImageFor(file, 'main', `page_${sitePageId}`, updateStmt);
  }

  public async saveSitePageLogo (sitePageId: number, file: Express.Multer.File) {
    const updateStmt = `UPDATE site_page SET site_page_logo = $1 where site_page_id = ${sitePageId}`;
    return this.updateSmallOrBigImageFor(file, 'main', `page_logo_${sitePageId}`, updateStmt);
  }

  public async saveClActivityMainClientLogo (clActivityId: number, file: Express.Multer.File) {
    const updateStmt = `UPDATE cl_activity SET cl_activity_main_client_img = $1 where cl_activity_id = ${clActivityId}`;
    return this.updateSmallOrBigImageFor(file, 'clients', `client_${clActivityId}`, updateStmt);
  }


  public async getSiteDocuments () {
    return postgresWrapper.anyWhere('v_api_site_document')
  }

  public async saveSiteDocument (siteDocument: SiteDocument) {
    return await TypeOrmManager.EntityManager.save(siteDocument);
  }

  public async deleteSiteDocument (id: number) {
    return await postgresWrapper.delete('site_document', 'site_document_id=$1', [id])
  }

  public async addSiteDocument (file: Express.Multer.File, id: number) {
    const updateStmt = `UPDATE site_document SET site_document_file = $1 where site_document_id = ${id}`;
    const pathAndName = await this.saveFileFromRequestBody(file, 'docs', 'site', `doc${id}`);
    if (pathAndName) {
      return postgresWrapper.execNone(updateStmt, [`/docs/site/${pathAndName[1]}`]);
    }
  }

  public getImageFullPathAndFileName (dir: string, subDir: string, fileprefix: string, fileExt: string) {
    const pathName = path.resolve('static', dir, subDir);
    const fileName = `${fileprefix}_${cuid()}.${fileExt}`;
    if (!fs.existsSync(pathName)) {
      fs.mkdirSync(pathName, { recursive: true });
    }

    return [path.resolve(pathName, fileName), fileName];
  }

  public async saveFileFromRequestBody (file: Express.Multer.File, dir: string, subDir: string, fileprefix: string): Promise<string[]> {
    if (!!file && file.size > 0) {
      let fileExt = mime.extension(file.mimetype);
      fileExt = fileExt ? fileExt : 'txt';

      const pathAndName = this.getImageFullPathAndFileName(dir, subDir, fileprefix, fileExt);

      const promise = new Promise<string[]>((resolve, reject) => {
        if (pathAndName[0]) {
          fs.writeFile(pathAndName[0], file.buffer, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(pathAndName);
            }
          })
        } else {
          resolve(pathAndName);
        }
      }
      )
      return promise;
    } else {
      Promise.resolve(false);
    }
  }

  private async updateSmallOrBigImageFor (file: Express.Multer.File, imageStaticSubFolderName: string, filePrefix: string, updateStmt: string) {
    const pathAndName = await this.saveFileFromRequestBody(file, 'img', imageStaticSubFolderName, filePrefix);
    if (pathAndName) {
      return postgresWrapper.execNone(updateStmt, [`/img/${imageStaticSubFolderName}/${pathAndName[1]}`]);
    }
  }
}
