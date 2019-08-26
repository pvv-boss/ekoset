import PgUtls from '@/utils/PgUtils';
import SortFilterPagination from '@/entities/SortFilterPagination';
import ClassTransform from '@/utils/ClassTransform';

export default class BaseService {

  public async getDbViewResult (viewName: string, sortFilterPagin?: SortFilterPagination, whereStmt?: string, whereParams?: any[]) {
    return PgUtls.getAnyFromDatabase(viewName, sortFilterPagin, whereStmt, whereParams);
  }


  public async getDbViewRowCount (viewName: string, whereStmt?: string, whereParams?: any[]) {
    return PgUtls.getCountFrom(viewName, whereStmt, ...whereParams);
  }

  public async getOneById (viewName: string, whereStmt: string, id: number) {
    return PgUtls.getOneFromDatabse(viewName, whereStmt, [id]);
  }

  public async deleteById (viewName: string, whereStmt: string, id: number) {
    return PgUtls.delete(viewName, whereStmt, [id]);
  }

  public getOneEntityInstanceFromJson<T> (dbResult: {}, classType: new () => T): T {
    if (dbResult) {
      return ClassTransform.plainToClassInstanceOne<T>(dbResult, classType);
    }
    return null;
  }
}
