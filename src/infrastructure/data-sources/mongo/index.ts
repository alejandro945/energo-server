import { IDataServices } from "@/domain/repositories/abstract-data-repository";
import { ICommonUseCases, ISitesUseCases } from "@/domain/use-cases/common";
import { MongoGenericRepository } from "./repositories/mongo-generic-repository";
import { SiteModel } from "./models/Site";
import { Site } from "@/domain/entities/Site";
import { Alert } from "@/domain/entities/Alert";
import { AlertModel } from "./models/Alert";
import { MongoSummaryRepository } from "./repositories/mongo-summary-repository";

export class MongoDataSource implements IDataServices {
    sites: ISitesUseCases;
    alerts: ICommonUseCases<Alert>;
    constructor() {
        this.sites = new MongoSummaryRepository(SiteModel);
        this.alerts = new MongoGenericRepository<Alert>(AlertModel);
    }
}