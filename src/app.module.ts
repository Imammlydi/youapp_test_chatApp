import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs-example'),
    UserModule,
    AuthModule,
    ChatModule,
    // ClientsModule.register([
    //   {
    //     name: 'RABBITMQ_MICROSERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'nestjs_queue',
    //     },
    //   },
    // ]),

    ClientsModule.register([
      {
        name: 'TCP_MICROSERVICE',  
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtMiddleware).forRoutes('*');
//   }
// }
