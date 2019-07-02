/**
 * @module clientErrors
 */
/** */
import { Exception } from '../Exception';

export class NotFound extends Exception {

  public name: string = 'NOT_FOUND';

  constructor (message: string) {
    super(404, message);
  }
}
