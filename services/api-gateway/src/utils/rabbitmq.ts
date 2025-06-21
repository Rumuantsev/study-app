import amqp from "amqplib";

const QUEUE_NAME = "enroll_queue";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
};

export const publishToQueue = async (data: any) => {
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
  console.log(
    `Сообщение отправлено в очередь '${QUEUE_NAME}': '${JSON.stringify(data)}'`
  );
  await new Promise((resolve) => setTimeout(resolve, 500));
};
