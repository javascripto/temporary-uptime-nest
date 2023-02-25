import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { Period } from '.';

@Entity()
export class Healer {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;
  
  @Column()
  surname: string;
  
  @Column()
  nickname: string;
  
  @Column()
  onlineBetween: Period;
}

export type CreateHealerDTO = Pick<Healer, 'name' | 'surname' | 'onlineBetween'>;