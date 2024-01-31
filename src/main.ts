import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';





async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug'],
  });


  app.use(passport.initialize());

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'chat_queue',
  //   },
  // });

  // const microserviceOptions: MicroserviceOptions = {
  //   transport: Transport.TCP,
  //   options: {
  //     host: 'localhost',
  //     port: 3001,
  //   },
  // };

  // Memulai mikroservis
  // const microservice = app.connectMicroservice(microserviceOptions);
  const tcpMicroserviceOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3001,
    },
  };
  app.connectMicroservice(tcpMicroserviceOptions);
  
  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
