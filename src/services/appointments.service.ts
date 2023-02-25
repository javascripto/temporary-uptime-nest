import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Period } from '../entities';
import { HoursService } from './hours.service';
import { Healer } from '../entities/healer.entity';
import { Appointment } from '../entities/appointment.entity';


@Injectable()
export class AppointmentsService {
  constructor(
    private hoursService: HoursService,

    @InjectRepository(Healer)
    private healerRepository: Repository<Healer>,

    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  async scheduleDungeon(
    healerNickName: string,
    warriorNickname: string,
    schedule: [Date, Period],
  ): Promise<Appointment> {
    const [date, period] = schedule;
    const [start] = period;
    const [healer, appointments] = await Promise.all([
      this.healerRepository.findOne({ where: { nickname: healerNickName }}),
      this.appointmentsRepository.find({
        where: {
          date,
          dungeon: {
            healerNickName,
          },
        }
      })
    ]);
    if (!healer) throw new Error('Healer not found');
    const busyPeriods = appointments.map(({ period }) => period);
    const isAvailable = this.hoursService
      .checkAvailability(start, healer.onlineBetween, busyPeriods);
    if (!isAvailable) throw new Error('Unavailable');
    return this.appointmentsRepository.save({
      date,
      period,
      dungeon: {
        healerNickName,
        warriorNickname,
      },
    });
  }
}
