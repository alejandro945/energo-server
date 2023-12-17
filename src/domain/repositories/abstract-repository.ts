import { ICommonUseCases } from "../use-cases/common";

export class AbstractRepositoryImpl<T> implements ICommonUseCases<T> {
    dataSource: ICommonUseCases<T>
    //Dependency Injection
    constructor(dataSource: ICommonUseCases<T>) {
        this.dataSource = dataSource
    }
    add(entity: T): Promise<T> {
        return this.dataSource.add(entity)
    }
    update(entity: T): Promise<T> {
        return this.dataSource.update(entity)
    }
    delete(id: number): Promise<void> {
        return this.dataSource.delete(id)
    }
    getById(id: number): Promise<T> {
        return this.dataSource.getById(id)
    }
    getAll(): Promise<T[]> {
        return this.dataSource.getAll()
    }
}