export interface IBrokerUseCases {
    send: (topic: string, message: any) => Promise<void>;
}