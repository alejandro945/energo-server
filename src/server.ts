import express from 'express';
import { Kafka } from 'kafkajs';

//Web Server
const server = express();
server.use(express.json());

//Kafka
const kafka = new Kafka({
  clientId: 'energo',
  brokers: ['kafka:9092'], // url 'kafka' is the host and port is 9092
});
const producer = kafka.producer();

export {server, producer};