import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'energo',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'alarm-group' });

consumer.connect();
consumer.subscribe({ topic: 'alarms', fromBeginning: true });

consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message?.value?.toString(),
    });
  },
});