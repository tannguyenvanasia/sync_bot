import config, { envFilePath } from '@app/config/env.config';
import * as Joi from '@hapi/joi';
import { BotModule } from '@app/modules/bot.module';
import { MezonModule } from '@app/modules/mezon.module';
import { HealthController } from '@app/controllers/health.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: Joi.object({
        MEZON_TOKEN: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    EventEmitterModule.forRoot(),
    MezonModule.forRootAsync({
      imports: [ConfigModule],
    }),
    BotModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
