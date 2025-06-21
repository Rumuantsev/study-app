import amqp from "amqplib";
import { enrollToCourse } from "../controllers/enrollmentController";

export const startConsumer = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL!);
  const channel = await connection.createChannel();
  const QUEUE_NAME = "enroll_queue";

  await channel.assertQueue(QUEUE_NAME, { durable: true });

  channel.consume(
    QUEUE_NAME,
    async (msg) => {
      if (msg != null) {
        try {
          const messageContent = JSON.parse(msg.content.toString());
          console.log("Message received:", messageContent);
          if (!messageContent.userId || !messageContent.courseId) {
            console.warn("Invalid message, missing data:", messageContent);
            channel.ack(msg);
            return;
          }
          await enrollToCourse(messageContent.userId, messageContent.courseId);
          channel.ack(msg);
        } catch (err) {
          console.error("Error:", err);
          channel.nack(msg, false, false);
        }
      } else {
        console.log("The consumer is canceled by the server!");
      }
    },
    { noAck: false }
  );

  console.log("Consumer is running for queue:", QUEUE_NAME);
};
