const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Order Service Kafka Producer is ready.");
});

producer.on("error", (err) => {
  console.error("Kafka Producer Error:", err);
});

const sendNotification = (message) => {
  const payloads = [
    { topic: "notifications", messages: JSON.stringify(message) },
  ];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error("Error sending Kafka message:", err);
    } else {
      console.log("Order notification sent:", data);
    }
  });
};

module.exports = sendNotification;
