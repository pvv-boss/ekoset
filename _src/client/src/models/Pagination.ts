export default class Pagination {
  public total: number = 0
  public limit: number = 0
  public currentPage: number = 1

  public offset (): number {
    return (this.currentPage - 1) * this.limit
  }
}
