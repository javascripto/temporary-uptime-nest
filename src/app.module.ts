import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Healer } from './entities/healer.entity';
import { Warrior } from './entities/warrior.entity';
import { Appointment } from './entities/appointment.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 27017,
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      database: 'uptime',
      useNewUrlParser: true,
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity.ts')],
    }),
    TypeOrmModule.forFeature([
      Healer,
      Warrior,
      Appointment,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
