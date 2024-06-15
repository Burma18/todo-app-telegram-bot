import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TG_TOKEN } from './config';
import { join } from 'path';
import { TaskEntity } from './entities/task.entity';

console.log(typeof process.env.POSTGRES_PASSWORD);
console.log(process.env.POSTGRES_PASSWORD);

const sessions = new LocalSession({ database: 'session_db.json' });
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: TG_TOKEN,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '12345burma',
      username: 'postgres',
      entities: ['dist/entities/*.entity.{ts,js}'],
      database: 'todo-app-tg-bot',
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  providers: [AppService, AppUpdate],
  controllers: [],
})
export class AppModule {}
