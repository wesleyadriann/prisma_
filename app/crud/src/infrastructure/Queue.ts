import amqplib from "amqplib";

export class QueueClient {
  private static connection?: amqplib.ChannelModel;
  private static channel?: amqplib.Channel;

  private QUEUE_NAME = "email_queue";

  public async connect() {
    if (QueueClient.connection?.connection) return;
    console.log("connectiong");
    QueueClient.connection = await amqplib.connect(
      `amqp://${process.env.QUEUE_URL}`,
    );
    QueueClient.channel = await QueueClient.connection.createChannel();
    await QueueClient.channel.assertQueue(this.QUEUE_NAME, { durable: true });
  }

  public sendToQueue(content: string) {
    const buffer = Buffer.from(content);
    return QueueClient.channel?.sendToQueue(this.QUEUE_NAME, buffer);
  }
}
