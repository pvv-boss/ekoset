import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cl_activity')
export class ClActivityType {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'cl_activity_id'
  })
  public clActivityId: number;


  @Column('text', {
    nullable: true,
    name: 'cl_activity_name'
  })
  public clActivityName: string;
}
