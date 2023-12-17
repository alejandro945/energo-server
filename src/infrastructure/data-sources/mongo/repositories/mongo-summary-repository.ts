import { Site } from "@/domain/entities/Site";
import { MongoGenericRepository } from "./mongo-generic-repository";
import { ISitesUseCases } from "@/domain/use-cases/common";
import { Model } from "mongoose";


export class MongoSummaryRepository extends MongoGenericRepository<Site> implements ISitesUseCases {

    constructor(repository: Model<Site>) {
        super(repository);
    }

    getSummary() {
        return this._repository.aggregate([
            {
                $addFields: {
                    convertedId: { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from: 'alerts',
                    localField: 'convertedId',
                    foreignField: 'site',
                    as: 'alerts',
                },
            },
            {
                $group: {
                    _id: '$alerts.severity',
                    count: { $sum: 1 },
                    details: { $push: '$alerts' },
                },
            }
        ]).exec();
    };

}