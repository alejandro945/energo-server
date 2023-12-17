import { ICommonUseCases } from "@/domain/use-cases/common";
import { Model, UpdateQuery } from "mongoose";


export class MongoGenericRepository<T> implements ICommonUseCases<T> {
    protected _repository: Model<T>;
    protected _populateOnFind: string[];

    constructor(repository: Model<T>, populateOnFind: string[] = []) {
        this._repository = repository;
        this._populateOnFind = populateOnFind;
    }

    getAll(): Promise<T[]> {
        return this._repository.find().sort({ createdAt: -1 }).populate(this._populateOnFind).exec();
    }

    update(id: string, item: T): any {
        return this._repository.findByIdAndUpdate(id, item as UpdateQuery<T>);
    }

    delete(id: string) {
        return this._repository.findByIdAndDelete(id);
    }

    findOne(_filter: any, value: string): any {
        return this._repository.findOne({ [_filter]: value }).populate(this._populateOnFind).exec();
    }

    add(item: T): Promise<T> {
        return this._repository.create(item);
    }
}