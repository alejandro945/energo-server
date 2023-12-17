import { IBrokerUseCases } from "@/domain/use-cases/broker";
import { Kafka, KafkaConfig, Partitioners, Producer } from "kafkajs";


export class KafkaGenericRepository implements IBrokerUseCases {

    private kafka!: Kafka;

    private producer!: Producer;

    public async send(topic: string, message: any): Promise<void> {
        console.log(`Kafka Send message. Topic: ${topic}`);
        await this.configure();
        try {
            await this.producer.connect();
            console.log(`Kafka Connected. Topic: ${topic}`);
            await this.producer.send({
                topic,
                acks: -1,
                messages: [
                    {
                        value: JSON.stringify(message)
                    },
                ],
            })
            console.log(`Kafka message sent. Topic: ${topic}`);
        } catch (e: any) {
            console.error(`Kafka error: ${e}`);
            throw new Error(e.message);
        }
    }


    public async configure() {
        if (this.kafka == null) {
            const kafkaConfig: KafkaConfig = {
                brokers: process.env.KAFKA_BROKERS?.split(',') || [],
                clientId: process.env.KAFKA_CLIENT_ID || '',
                ssl: true,
                sasl: {
                    mechanism: 'scram-sha-512',
                    username: process.env.KAFKA_USERNAME || '',
                    password: process.env.KAFKA_PASSWORD || '',
                },
            };
            this.kafka = new Kafka(kafkaConfig);
            this.producer = this.kafka.producer({
                retry: { retries: 300 },
                maxInFlightRequests: 5,            
                allowAutoTopicCreation: true,
                createPartitioner: Partitioners.DefaultPartitioner
            });
        }
    }

    public getProducer(): Producer {
        return this.producer;
    }

}