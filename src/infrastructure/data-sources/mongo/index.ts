import { IDataServices } from "@/domain/repositories/abstract-data-repository";
import { ICommonUseCases } from "@/domain/use-cases/common";
import { MongoGenericRepository } from "./repositories/mongo-generic-repository";
import { SiteModel } from "./models/Site";
import { Site } from "@/domain/entities/Site";
import { Alert } from "@/domain/entities/Alert";
import { AlertModel } from "./models/Alert";

export class MongoDataSource implements IDataServices {
    sites: ICommonUseCases<Site>;
    alerts: ICommonUseCases<Alert>;
    constructor() {
        this.sites = new MongoGenericRepository<Site>(SiteModel);
        this.alerts = new MongoGenericRepository<Alert>(AlertModel);
    }
}