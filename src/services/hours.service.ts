import { Injectable } from '@nestjs/common';

import { Hour, Period } from '../entities';


@Injectable()
export class HoursService {
  checkAvailability(
    hours: Hour,
    availability: Period,
    appointments: Period[]
  ): boolean {
    for (const option of this.filterAvailablePeriods(availability, appointments)) {
      if (this.compare(option, hours)) {
        return true;
      }
    }
    return false;
  }

  filterAvailablePeriods(
    onlineBetween: Period,
    appointments: Period[],
  ): Hour[] {
    const busyPeriods = this.generateBusyPeriods(appointments);
    const availablePeriods: Hour[] = [];
    for (let option of this.createPeriodOptions(onlineBetween)) {
      let shouldRemain = true
      for (let busyPeriod of busyPeriods) {
        if (this.compare(option, busyPeriod)) {
          shouldRemain = false;
        }
      }
      if (shouldRemain) availablePeriods.push(option);
    }
    return availablePeriods;
  }

  private createPeriodOptions(period: Period): Hour[] {
    const [start, end] = period;
    let option: Hour = { hour: start.hour, minute: start.minute };
    const options: Hour[] = [];
    while (true) {
      options.push(option);
      const nextHour = this.addHours(option, 1)
      if (this.compare(nextHour, end)) {
        break;
      }
      option = this.addMinutes(option, 30);
    }
    return options;
  }

  private generateBusyPeriods(appointments: Period[]): Hour[] {
    const busyHours: Hour[] = [];
    appointments.forEach((appointment: Period) => {
      const [start, end] = appointment
      let option: Hour = { hour: start.hour, minute: start.minute };
      option = this.subtractHours(option, 1);
      option = this.addMinutes(option, 30);
      while (!this.compare(option, end)) {
        busyHours.push(option)
        option = this.addMinutes(option, 30)
      }
    });
    return busyHours
  }

  private addMinutes(hours: Hour, minutes: number): Hour {
    let hour = hours.hour;
    let minute = hours.minute;
    minute += minutes;
    if (minute >= 60) {
      minute -= 60;
      hour++;
    }
    return { hour, minute };
  }

  private subtractHours(hours: Hour, hour: number): Hour {
    return { hour: hours.hour - hour, minute: hours.minute };
  }

  private addHours(hours: Hour, hour: number): Hour {
    return { hour: hours.hour + hour, minute: hours.minute };
  }

  private compare(first: Hour, second: Hour): boolean {
    return first.hour == second.hour && first.minute == second.minute;
  }
}
