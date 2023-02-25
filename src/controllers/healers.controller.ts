import { Response } from 'express';
import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';

import { CreateHealerDTO } from '../entities/healer.entity';
import { HealersService } from '../services/healers.service';


@Controller('healers')
export class HealersController {
  constructor(private healersService: HealersService) {}

  @Post()
  create(@Body() createHealerDTO: CreateHealerDTO) {
    return this.healersService.create(createHealerDTO);
  }

  @Get()
  list() {
    return this.healersService.findAll();
  }

  @Get(':nickname/availability')
  async listAvailability(
    @Param('nickname') healerNickname: string,
    @Query() { date: dateString }: { date: string},
    @Res() response: Response
  ) {
    if (!dateString) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: {
          message: 'date param is required'
        }
      });
    }
    const date = new Date(Date.parse(dateString));
    try {
      const availabilityTimes = await this.healersService.listAvailablePeriods(healerNickname, date)
      return response.status(HttpStatus.OK).json(availabilityTimes);
    } catch (error) {
      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        error: {
          message: error.message,
        }
      })
    }
  }
}
