export class SmsResponse {
  status: string;
  statusCode?: number;
  statusText?: string;
  balance?: number;
  smsInfoList: SmsInfo[] = [];
}

export interface SmsInfo {
  id: number;
  status: string;
  statusCode: number;
  toPhone?: number;
  message?: string;
  dateTime?: Date;
}