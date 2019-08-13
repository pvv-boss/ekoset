import { JsonController, Get, Res, Param, Req, Body, Put, Delete } from 'routing-controllers';
import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import ServiceContainer from '@/services/ServiceContainer';
import { Article } from '@/entities/ekoset/Article';
import { NotFound } from '@/exceptions/clientErrors/NotFound';

@JsonController()
export default class PublicEkosetController extends BaseController {

}
