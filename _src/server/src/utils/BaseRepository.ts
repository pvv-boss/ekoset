import ClassTransform from './ClassTransform';

export default class BaseRepository<T> {

  private classType: new () => T;

  constructor (classType: new () => T) {
    this.classType = classType;
  }

  public getOneEntityInstanceFromJson (dbResult: {}): T {
    if (dbResult) {
      return ClassTransform.plainToClassInstanceOne<T>(dbResult, this.classType);
    }
    return null;
  }
}
