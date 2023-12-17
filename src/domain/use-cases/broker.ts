export interface IBrokerUseCases<T> {
    send: (topic: string, message: T) => Promise<void>;
}