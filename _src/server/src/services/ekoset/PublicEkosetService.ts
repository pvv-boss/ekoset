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

export default class PublicEkosetService extends BaseService {

}
