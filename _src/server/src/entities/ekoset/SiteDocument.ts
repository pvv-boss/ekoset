import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity('site_document')
export default class SiteDocument {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'site_document_id'
  })
  public siteDocumentId: number

  @Column({ name: 'site_document_name' })
  public siteDocumentName: string

  @Column({ name: 'site_document_file' })
  public siteDocumentFile: string

  @Column({ name: 'site_document_status' })
  public siteDocumentStatus: boolean

  @Column({ name: 'site_document_url' })
  public siteDocumentUrl: string

  @Column({ name: 'site_section_id' })
  public siteSectionId: number;

}
