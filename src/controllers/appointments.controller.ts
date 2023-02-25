import { Response } from 'express';
import { Body, Controller, Res, HttpStatus, Post } from '@nestjs/common';

import { Hour, Period } from '../entities';
import { Appointment } from '../entities/appointment.entity';
import { AppointmentsService } from '../services/appointments.service';


@Controller('appointments')
export class AppointmentsController {
  constructor(private appointmentsService: AppointmentsService) {}

  @Post()
  public async create(
    @Body() createAppointmentDTO: CreateAppointmentDTO,
    @Res() response: Response
  ): Promise<Response<Appointment>> {
    const {start, end, date: stringDate, healerNickname, warriorNickname } = createAppointmentDTO;
    const date = new Date(Date.parse(stringDate));
    const period: Period = [
      { hour: start.hour, minute: start.minute },
      { hour: end.hour, minute: end.minute },
    ];
    try {
      const appointment = await this.appointmentsService.scheduleDungeon(
        healerNickname,
        warriorNickname,
        [date, period],
      );
      return response.status(HttpStatus.CREATED).json(appointment);
    } catch (error) {
      return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        error: {
          message: error.message
        }
      });
    }
  }
}

export interface CreateAppointmentDTO {
  end: Hour;
  start: Hour;
  date: string;
  healerNickname: string;
  warriorNickname: string;
}