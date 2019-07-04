import PgUtls from '@/utils/PgUtils';
import SortFilterPagination from '@/entities/SortFilterPagination';

export default class BaseService {

  public async getDbViewResult (viewName: string, sortFilterPagin?: SortFilterPagination, whereStmt?: string, whereParams?: any[]) {
    return PgUtls.getAnyFromDatabase(viewName, sortFilterPagin, whereStmt, ...whereParams);
  }


  public async getDbViewRowCount (viewName: string, whereStmt?: string, whereParams?: any[]) {
    return PgUtls.getCountFrom(viewName, whereStmt, ...whereParams);
  }
}
