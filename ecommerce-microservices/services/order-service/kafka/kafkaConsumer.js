const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const consumer = new kafka.Consumer(client, [{ topic: "notifications", partition: 0 }], {
  autoCommit: true,
});

consumer.on("message", (message) => {
  console.log("Order Service Received Notification:", JSON.parse(message.value));
});

consumer.on("error", (err) => {
  console.error("Kafka Consumer Error:", err);
});

module.exports = consumer;
