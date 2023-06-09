import { EntityTarget, Repository } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ConfigServer } from "./config";

export class BaseService<T extends BaseEntity> extends ConfigServer{
  public execRepository: Promise<Repository<T>>;
  constructor( getEntity: EntityTarget<T>){
    super()
    this.execRepository = this.initRepository(getEntity)
  }

  async initRepository<T>(e: EntityTarget<T>) {
    const getConn = await this.initConnect;
    return getConn.getRepository(e)
  }
}