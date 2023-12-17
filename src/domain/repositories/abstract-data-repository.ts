import { Alert } from "../entities/Alert";
import { Site } from "../entities/Site";
import { ICommonUseCases } from "../use-cases/common";

export abstract class IDataServices {
    abstract sites: ICommonUseCases<Site>;
    abstract alerts: ICommonUseCases<Alert>;
}