import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { Period, Dungeon } from '.';

@Entity()
export class Appointment {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  readonly date: Date;
  
  @Column()
  readonly period: Period;

  @Column()
  readonly dungeon: Dungeon;
}
