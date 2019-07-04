import AppConfig from './Config';
import { IMain, IDatabase, IOptions } from 'pg-promise';
import * as pgPromise from 'pg-promise';
import SortFilterPagination from '../entities/SortFilterPagination';
import * as camelcaseKeys from 'camelcase-keys';

class PgUtls {
  private postgrePromise: IDatabase<{}>

  constructor () {
    const initOptions = {
      ...AppConfig.dbConfig.pgOptions,
      receive (data, result, e) {
        result.rows = camelcaseKeys(data);
      }
    };

    const pgp: IMain = pgPromise(initOptions);

    this.postgrePromise = pgp(AppConfig.dbConfig);
  }


  public async getAnyFromDatabase (dbViewName: string, sortFilterPagin?: SortFilterPagination, whereStmt?: string, ...whereParams): Promise<any[]> {
    const selectStmt = this.buildSelectStatement(dbViewName, sortFilterPagin, whereStmt);
    // const params = this.expandWhereParams(whereStmt, whereParams);
    const params = whereParams;
    return this.postgrePromise.any({
      text: selectStmt,
      values: params
    });
  }

  public async getOneFromDatabse (dbViewName: string, whereStmt?: string, ...whereParams): Promise<any> {
    const selectStmt = this.buildSelectStatement(dbViewName, null, whereStmt);
    // const params = this.expandWhereParams(whereStmt, whereParams);
    const params = whereParams;
    return this.postgrePromise.oneOrNone({
      text: selectStmt,
      values: params
    });
  }


  public async execOneFromDatabse (select: string): Promise<any> {
    return this.postgrePromise.oneOrNone(select);
  }

  public async delete (tableName: string, whereStmt: string, ...whereParams) {
    const stmtp = `DELETE FROM ${tableName} WHERE ${whereStmt} `;
    // const params = this.expandWhereParams(whereStmt, whereParams);
    const params = whereParams;
    return this.postgrePromise.none(stmtp, params);
  }

  public async execAnyFromDatabse (select: string): Promise<any> {
    return this.postgrePromise.any(select);
  }

  public async getCountFrom (dbViewName: string, whereStmt?: string, ...whereParams) {
    let count = 0;
    const selectStmtp = `SELECT COUNT(1) FROM ${dbViewName}`;
    let whereAdd = '';
    if (whereStmt != null) {
      whereAdd = ` WHERE ${whereStmt} `;
    }
    // const params = this.expandWhereParams(whereStmt, whereParams);
    const params = whereParams;
    const countObj = await this.postgrePromise.one({
      text: selectStmtp + whereAdd,
      values: params
    });

    if (countObj && countObj.count) {
      count = Number(countObj.count.toString());
    }

    return count;
  }


  public async execNone (statement: string, ...params) {
    return this.postgrePromise.none(statement, params);
  }

  private buildSelectStatement (dbViewName: string, sortFilterPagin?: SortFilterPagination, whereStmt?: string) {
    const selectStmtp = `SELECT * FROM ${dbViewName}`;
    let whereAdd = '';
    let limitOffsetAdd = '';
    let sortAdd = '';

    if (whereStmt) {
      whereAdd = ` WHERE ${whereStmt} `;
    }

    if (sortFilterPagin) {
      if (sortFilterPagin.sort && sortFilterPagin.sort.sortField) {
        sortAdd = ` ORDER BY ${sortFilterPagin.sort.sortField} ${sortFilterPagin.sort.sortType} `;
      }
      if (sortFilterPagin.pagination && sortFilterPagin.pagination.limit && sortFilterPagin.pagination.offset) {
        limitOffsetAdd = ` LIMIT ${sortFilterPagin.pagination.limit} OFFSET ${sortFilterPagin.pagination.offset}`;
      }
    }

    return selectStmtp + whereAdd + sortAdd + limitOffsetAdd;
  }

}

const pgUtils = new PgUtls();
export default pgUtils;








