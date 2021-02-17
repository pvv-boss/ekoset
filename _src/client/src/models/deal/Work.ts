import { BaseViewModel } from "../core/BaseViewModel";

export default class Work extends BaseViewModel {
    public contractId: number;
    public contractForm: string;
    public contractDateStart: string;
    public contractAddress: string;
    public personId: number;
    public clientId: number;
    public clientName: string;
    public sheldServiceId: number;
    public sheldServiceDate: string;
    public sheldServiceName: string;
    public sheldServicePlanInd: number;
    public sheldServiceNewDate: string;
    public sheldServiceBall: number;
    public sheldServiceBallDescription: string;
}
