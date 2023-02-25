import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Healer } from './entities/healer.entity';
import { Warrior } from './entities/warrior.entity';
import { Appointment } from './entities/appointment.entity';
import { HoursService } from './services/hours.service';
import { HealersService } from './services/healers.service';
import { WarriorsService } from './services/warriors.service';
import { AppointmentsService } from './services/appointments.service';


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
  providers: [
    HoursService,
    HealersService,
    WarriorsService,
    AppointmentsService,
  ],
})
export class AppModule {}
