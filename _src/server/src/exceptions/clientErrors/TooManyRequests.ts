/**
 * @module clientErrors
 */
/** */
import { Exception } from "../Exception";

export class TooManyRequests extends Exception {

  name: string = "TOO_MANY_REQUESTS";

  constructor (message: string) {
    super(429, message);
  }
}