import SessionUser from "./SessionUser";

export default class LoginData {
    public login = "";
    public password = "";
    public rememberMe = true;
    public unlinkedSocialUser: SessionUser;
}
