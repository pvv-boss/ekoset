
import { Request, Response, NextFunction } from 'express';
import SessionUser from '@/entities/users/SessionUser';
import { ResponseWrapper } from './ResponseWrapper';
import { Exception } from '@/exceptions/Exception';
import AppConfig from '@/utils/Config';
import TokenUtil from '@/utils/TokenUtil';
import ClientNotifyMessage from './ClientNotifyMessage';

export class BaseController {

  public static addJWTCookie (res: Response, payload: any, accessToken?: string) {
    const cookie = {
      payload,
      accessToken
    }

    const cookieOptions = {
      expires: new Date(Date.now() + 300000),
      httpOnly: false,
      hostOnly: false,
      secure: false
    }

    res.cookie(AppConfig.authConfig.cookieName, JSON.stringify(cookie), cookieOptions);
  }

  public static clearJWTCookie (res: Response) {
    res.clearCookie(AppConfig.authConfig.cookieName);
  }

  public static setJWTHeader (res: Response, jwt: string) {
    res.header(AppConfig.authConfig.jwtHeaderName, jwt);
  }

  public static removeJWTHeader (res: Response) {
    res.removeHeader(AppConfig.authConfig.jwtHeaderName);
  }

  public static getCurrentUserId (req: Request): number {
    const test = req.user ? req.user : SessionUser.anonymousUser.appUserId;
    return test;
  }

  public static setCurrentUserAnonymous (req: Request, res: Response) {
    if (req && req.user) {
      req.user = SessionUser.anonymousUser.appUserId;
    }
    BaseController.removeJWTHeader(res);
    // BaseController.clearJWTCookie(res);
  }

  public static isUserUserAnonymous (req: Request) {
    const result = !(!!req && !!req.user && req.user !== 0);
    return result;
  }

  public static isUserAuthorized (req: Request) {
    return !this.isUserUserAnonymous(req);
  }

  public static getUserSessionId (req: Request) {
    let sessionToken = null;
    const accessToken = this.getRequestAccessToken(req);
    if (accessToken) {
      sessionToken = TokenUtil.getJwtId(accessToken);
    }
    return sessionToken
  }

  public static getSessionUser (req: Request) {
    let sessionUser: SessionUser = SessionUser.anonymousUser;
    const accessToken = this.getRequestAccessToken(req);
    if (accessToken) {
      sessionUser = TokenUtil.getSessionUser(accessToken)
    }
    return sessionUser;
  }

  public static getRequestAccessToken (req: Request) {
    const tokenHeader = req.get('x-access-token') || req.get('authorization');
    if (tokenHeader && tokenHeader.startsWith('Bearer ')) {
      return tokenHeader.slice(7, tokenHeader.length);
    }
    return null;
  }

  public static createSuccessResponseWithMessage (result: {}, res: Response, statusCode = res.statusCode, message: ClientNotifyMessage, redirectUrl?: string) {
    const response = ResponseWrapper.createSuccsess(result, statusCode, message, redirectUrl);
    return res.status(statusCode).json(response);
  }

  public static createSuccessResponse (result: {}, res: Response, statusCode = res.statusCode, redirectUrl?: string) {
    const response = ResponseWrapper.createSuccsess(result, statusCode, null, redirectUrl);
    return res.status(statusCode).json(response);
  }

  public static createFailureResponse (exc: Exception, res: Response, redirectUrl?: string) {
    const response = ResponseWrapper.createFailure(exc, null, redirectUrl);
    return res.status(res.statusCode).json(response);
  }

  public static createFailureResponseWithMessage (exc: Exception, res: Response, message: ClientNotifyMessage, redirectUrl?: string) {
    const response = ResponseWrapper.createFailure(exc, message, redirectUrl);
    return res.status(res.statusCode).json(response);
  }

  public static setLocationToClient (response: Response, location: string) {
    const loc = process.env.NODE_ENV === 'development' ? `http://localhost:3000${location}` : location
    return this.createSuccessResponse({}, response.location(loc), 302);
  }
}
