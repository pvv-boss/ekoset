import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('cl_activity')
export class ClActivity {

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

  // @Column('numeric', {
  //   nullable: true,
  //   name: 'cl_activity_status'
  // })
  // public clActivityStatus: number;


  // @Column('numeric', {
  //   nullable: true,
  //   name: 'cl_activity_priority'
  // })
  // public clActivityPriority: number;

}
