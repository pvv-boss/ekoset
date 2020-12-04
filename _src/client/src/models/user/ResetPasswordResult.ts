import SessionUser from './SessionUser';

export enum ResetPasswordStatus {
    OK,
    RequereConfirmByMail,
    RequereConfirmBySmsCode,
    ResetPasswordExpaired,
    Failed,
    Unknown
}

export class ResetPasswordResult {
    public status: ResetPasswordStatus = ResetPasswordStatus.Unknown
    public sessionUser: SessionUser = SessionUser.anonymousUser;
    public message: string
}