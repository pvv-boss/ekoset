export default class UserRequest {

  public userRequestId: number | null;
  public userRequestDate = Date.now();
  public userRequestType = '';
  public userRequestUser = '';
  public userRequestPhone = '';
  public userRequestMail = '';
  public userRequestSection: string | null;
  public userRequestService: string | null;
  public userRequestText = '';
  public userRequestFileName = '';
}
