import kafka from "kafka-node";

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(client, [{ topic: "order-events", partition: 0 }], { autoCommit: true });

consumer.on("message", async (message) => {
  console.log("Received message from Kafka:", message.value);
});
