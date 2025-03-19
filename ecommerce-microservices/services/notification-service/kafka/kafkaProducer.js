const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Kafka Producer is ready.");
});

producer.on("error", (err) => {
  console.error("Kafka Producer Error:", err);
});

const sendNotification = (message) => {
  const payloads = [{ topic: "notifications", messages: JSON.stringify(message) }];
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error("Error sending Kafka message:", err);
    } else {
      console.log("Notification sent:", data);
    }
  });
};

module.exports = sendNotification;
