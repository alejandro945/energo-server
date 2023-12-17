import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'energo',
    brokers: ['kafka:9092'], // url 'kafka' is the host and port is 9092
});
const producer = kafka.producer();

export default producer;