import { BaseViewModel } from "./core/BaseViewModel";

export default class EkosetClient extends BaseViewModel {
    personId: number;
    managerId: number;
    personName: number;
    personPhone: number;
    personEmail: string;
    personDateCh: string;
    personBirthday: string;
    appUserId: number;
    appUserBlockedInd: number;

    notifFutureWork: boolean;
    notifEndWork: boolean;
    notifDesignSanitaryDoc: boolean;
    notifFinishedSanitaryDoc: boolean;
    notifLabProtocol: boolean;

    notifEmailInd: boolean;
    notifSmsInd: boolean;

    managerName: string;
    managerPhone: string;
    managerEmail: string;
}
