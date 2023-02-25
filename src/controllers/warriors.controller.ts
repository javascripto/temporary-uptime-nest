import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateWarriorDTO } from '../entities/warrior.entity';
import { WarriorsService } from '../services/warriors.service';


@Controller('warriors')
export class WarriorsController {
  constructor(private warriorsService: WarriorsService) {}

  @Get()
  public list() {
    return this.warriorsService.findAll();
  }

  @Post()
  public create(@Body() createWarriorDTO: CreateWarriorDTO) {
    return this.warriorsService.create(createWarriorDTO);
  }
}
