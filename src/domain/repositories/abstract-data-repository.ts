import { Alert } from "../entities/Alert";
import { ICommonUseCases, ISitesUseCases } from "../use-cases/common";

export abstract class IDataServices {
    abstract sites: ISitesUseCases;
    abstract alerts: ICommonUseCases<Alert>;
}