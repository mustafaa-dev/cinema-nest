export class MainChecker {
  constructor(
    private readonly document: any,
    private feature: any,
    private readonly repository: any,
    private readonly whereOptions: any,
    private entity: any,
    private from: any,
    private to: any,
  ) {}

  async check() {
    let data: any = null;
    let status: any = null;
    if (this.feature !== null) {
      data = await this.repository.checkOne(this.whereOptions);
      if (!data) {
        data = new this.entity();
        status = false;
        this.to = this.from;
        delete this.from;
        Object.assign(data, this.feature);
      } else {
        status = true;
      }
    }
    return { data, status };
  }
}
