const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Kafka Producer is ready for Product Service");
});

producer.on("error", (err) => {
  console.error("Kafka Producer error:", err);
});

const sendNotification = (message) => {
  producer.send(
    [{ topic: "product_notifications", messages: JSON.stringify(message) }],
    (err, data) => {
      if (err) console.error("Kafka Send Error:", err);
      else console.log("Kafka Message Sent:", data);
    }
  );
};

module.exports = sendNotification;
