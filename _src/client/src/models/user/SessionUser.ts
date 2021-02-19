import { AdminMenuSection } from "../AdminMenuSectionPermissionsManager";
import { BaseViewModel } from "../core/BaseViewModel";

export default class SessionUser extends BaseViewModel {
    public static anonymousUser: SessionUser = new SessionUser();

    public appUserId = 0;
    public appUserName = "Гость";
    public appUserBlockedInd = 0;
    public appUserRegDate: string;
    public appUserRegVerifiedInd: number;

    public userSnProfileId = 0;
    public userSnProfileType = "";
    public userSnProfileNick = "";
    public userSnProfileAvatar = "";
    public userSnProfileLink = "";
    public userSnProfileEmail = "Гость";

    public appUserAdminInd = false;

    public appUserPermissions = "[]";
    public menuPermissions: AdminMenuSection[] = [];
}

// // appUserName
