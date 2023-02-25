import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Healer } from './entities/healer.entity';
import { Warrior } from './entities/warrior.entity';
import { Appointment } from './entities/appointment.entity';
import { HoursService } from './services/hours.service';
import { HealersService } from './services/healers.service';
import { WarriorsService } from './services/warriors.service';
import { HealersController } from './controllers/healers.controller';
import { WarriorsController } from './controllers/warriors.controller';
import { AppointmentsService } from './services/appointments.service';
import { AppointmentsController } from './controllers/appointments.controller';


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
  controllers: [
    HealersController,
    WarriorsController,
    AppointmentsController,
  ],
  providers: [
    HoursService,
    HealersService,
    WarriorsService,
    AppointmentsService,
  ],
})
export class AppModule {}
