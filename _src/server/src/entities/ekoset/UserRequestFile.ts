import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user_request_file')
export class UserRequestFile {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'user_request_file_id'
  })
  public userRequestFileId: number;


  @Column({
    name: 'user_request_id'
  })
  public userRequestId: number;

  @Column('text', {
    name: 'user_request_file_name'
  })
  public userRequestFileName: string;
}
