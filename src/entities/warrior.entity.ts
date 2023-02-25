import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';


@Entity()
export class Warrior {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  surname: string;
  
  @Column()
  nickname: string;
}

export type CreateWarriorDTO = Pick<Warrior, 'name' | 'surname'>;