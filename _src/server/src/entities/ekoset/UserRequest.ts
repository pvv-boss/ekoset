import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user_request')
export class UserRequest {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'user_request_id'
  })
  public userRequestId: number;


  @Column({
    name: 'user_request_date'
  })
  public userRequestDate: string;


  @Column('text', {
    name: 'user_request_type'
  })
  public userRequestType: string;

  @Column('text', {
    name: 'user_request_user'
  })
  public userRequestUser: string;


  @Column('text', {
    name: 'user_request_phone'
  })
  public userRequestPhone: string;


  @Column('text', {
    name: 'user_request_mail'
  })
  public userRequestMail: string;


  @Column('text', {
    name: 'user_request_section'
  })
  public userRequestSection: string;


  @Column('text', {
    name: 'user_request_service'
  })
  public userRequestService: string;

  @Column('text', {
    name: 'user_request_text'
  })
  public userRequestText: string;

  @Column('text', {
    name: 'user_request_file_name'
  })
  public userRequestFileName: string;
}
