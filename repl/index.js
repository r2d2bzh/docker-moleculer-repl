import { ServiceBroker } from 'moleculer';

const broker = new ServiceBroker({
  transporter: process.env.TRANSPORTER || 'nats://nats:4222',
  replCommands: {},
});

broker
  .start()
  .then(() => {
    broker.getLogger('index').info(broker.repl);
    return broker.repl({ customCommands: [] });
  })
  .catch((error) => {
    broker.getLogger('index').fatal(error);
    process.exitCode = 1;
    broker.stop();
  });
