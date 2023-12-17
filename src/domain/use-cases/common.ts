export interface ICommonUseCases<T> {
    add: (entity: T) => Promise<T>;
    update: (id: string, entity: T) => Promise<T>;
    delete: (id: string) => any;
    findOne: (filter: string, value: string) => Promise<T>;
    getAll: () => Promise<T[]>;
}