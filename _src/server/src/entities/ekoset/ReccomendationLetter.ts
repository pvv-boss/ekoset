import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('recommendation')
export class ReccomendationLetter {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'recomm_id'
  })
  public recommId: number;

  @Column('text', {
    nullable: true,
    name: 'cl_brand_id'
  })
  public clBrandId: number | null;

}
