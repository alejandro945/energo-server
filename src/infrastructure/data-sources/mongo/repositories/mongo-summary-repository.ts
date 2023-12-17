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
                $unwind: { path: '$alerts', preserveNullAndEmptyArrays: true }
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    savings: { $first: '$savings' },
                    uptime: { $first: '$uptime' },
                    power: { $first: '$power' },
                    high: {
                        $sum: { $cond: [{ $eq: ['$alerts.severity', 'HIGH'] }, 1, 0] }
                    },
                    highDetails: {
                        $push: { $cond: [{ $eq: ['$alerts.severity', 'HIGH'] }, '$alerts', null] }
                    },
                    med: {
                        $sum: { $cond: [{ $eq: ['$alerts.severity', 'MEDIUM'] }, 1, 0] }
                    },
                    medDetails: {
                        $push: { $cond: [{ $eq: ['$alerts.severity', 'MEDIUM'] }, '$alerts', null] }
                    },
                    low: {
                        $sum: { $cond: [{ $eq: ['$alerts.severity', 'LOW'] }, 1, 0] }
                    },
                    lowDetails: {
                        $push: { $cond: [{ $eq: ['$alerts.severity', 'LOW'] }, '$alerts', null] }
                    },
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    savings: 1,
                    uptime: 1,
                    power: 1,
                    alerts: {
                        high: { count: '$high', details: { $filter: { input: '$highDetails', as: 'detail', cond: { $ne: ['$$detail', null] } } } },
                        med: { count: '$med', details: { $filter: { input: '$medDetails', as: 'detail', cond: { $ne: ['$$detail', null] } } } },
                        low: { count: '$low', details: { $filter: { input: '$lowDetails', as: 'detail', cond: { $ne: ['$$detail', null] } } } }
                    }
                }
            }
        ]).exec();
    };

}