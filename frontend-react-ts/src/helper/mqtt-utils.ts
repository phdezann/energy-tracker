import mqtt, { MqttClient } from 'mqtt';
import { v4 as uuidv4 } from 'uuid';

interface ConnectMqttOptions {
  server: string;
  port: string;
  username: string;
  password: string;
  topic: string;
  onMessageCallback: (topic: string, message: string) => void;
  onConnectCallback: () => void;
  onReconnectCallback: () => void;
  onErrorCallback: (error: string) => void;
}

const connectMqtt = ({
                       server,
                       port,
                       username,
                       password,
                       topic,
                       onMessageCallback,
                       onConnectCallback,
                       onReconnectCallback,
                       onErrorCallback,
                     }: ConnectMqttOptions): MqttClient => {
  const options = {
    clean: true,
    connectTimeout: 1000,
    clientId: `mqtt_client_${uuidv4()}`,
    username: username,
    password: password,
  };

  const client = mqtt.connect(`wss://${server}:${port}`, options);

  client.on('connect', () => {
    if (!client.connected) {
      return;
    }
    onConnectCallback();
    client.subscribe(topic, (err) => {
      if (err) {
        console.error('Subscription error:', err);
        onErrorCallback('Subscription error: ' + err.message);
      } else {
        console.debug(`Subscribed to topic: ${topic}`);
      }
    });
  });
  client.on('reconnect', () => {
    onReconnectCallback();
  });
  client.on('message', (topic, message) => {
    onMessageCallback(topic, message.toString());
  });
  client.on('error', (err) => {
    if (onErrorCallback) {
      onErrorCallback(err.message);
    }
  });
  return client;
};

export default connectMqtt;
