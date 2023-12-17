export interface ICommonUseCases<T> {
    add: (entity: T) => Promise<T>;
    update: (entity: T) => Promise<T>;
    delete: (id: number) => Promise<void>;
    getById: (id: number) => Promise<T>;
    getAll: () => Promise<T[]>;
}