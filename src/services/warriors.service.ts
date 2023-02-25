import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateWarriorDTO, Warrior } from '../entities/warrior.entity';


@Injectable()
export class WarriorsService {
  constructor(
    @InjectRepository(Warrior)
    private warriorsRepository: Repository<Warrior>,
  ) {}

  create(createWarriorDTO: CreateWarriorDTO): Promise<Warrior> {
    const { name, surname } = createWarriorDTO;
    return this.warriorsRepository.save({
      name,
      surname,
      nickname: `GUR_${randomUUID()}`,
    });
  }

  findAll(): Promise<Warrior[]> {
    return this.warriorsRepository.find();
  }
}
