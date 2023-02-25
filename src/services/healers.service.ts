import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Hour } from '../entities';
import { HoursService } from './hours.service';
import { Appointment } from '../entities/appointment.entity';
import { CreateHealerDTO, Healer } from '../entities/healer.entity';


@Injectable()
export class HealersService {

  constructor(
    private hoursService: HoursService,

    @InjectRepository(Healer)
    private healersRepository: Repository<Healer>,

    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
  ) {}

  create(createHealerDTO: CreateHealerDTO): Promise<Healer> {
    const { name, surname, onlineBetween } = createHealerDTO;
    const [start, end] = onlineBetween;
    return this.healersRepository.save({
      name,
      surname,
      nickname: `CUR_${randomUUID()}`,
      onlineBetween: [
        { hour: start.hour, minute: start.minute },
        { hour: end.hour, minute: end.minute },
      ],
    });
  }

  findAll(): Promise<Healer[]> {
    return this.healersRepository.find();
  }

  async listAvailablePeriods(nickname: string, date: Date): Promise<Hour[]> {
    const [healer, appointments] = await Promise.all([
      this.healersRepository.findOne({  where: { nickname} }),
      this.appointmentsRepository.find({ where: {
        date,
        dungeon: {
          healerNickName: nickname,
        },
      }})
    ]);
    if (!healer) throw new Error('Healer not found');
    const periods = appointments.map(({ period }) => period);
    return this.hoursService.filterAvailablePeriods(healer.onlineBetween, periods);
  }
}
