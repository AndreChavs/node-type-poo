import { DeleteResult, UpdateResult } from "typeorm";
import * as bcrypt from 'bcrypt'
import { BaseService } from "../../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity>{
  constructor(){
    super(UserEntity)
  }

  async findAllUser(): Promise<UserEntity[]>{
    return (await this.execRepository).find()
  }
  async findUserById(id:string): Promise<UserEntity | null>{
    return (await this.execRepository).findOneBy({id})
  }

  async findUserWithRelation(id: string){
    return (await this.execRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where({id})
      .getOne()
  }

  async findUserByEmail(email:string):Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ email })
      .getOne();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where({ username })
      .getOne();
  }

  async createUser(body:UserDTO): Promise<UserEntity>{
    const newUser = (await this.execRepository).create(body)
    const hashPass = await bcrypt.hash(newUser.password, 10)
    newUser.password = hashPass
    return (await this.execRepository).save(newUser)
  }
  async deleteUser(id: string): Promise<DeleteResult>{
    return (await this.execRepository).delete({id})
  }
  async updateUser(id: string, infoUpdate: object): Promise<UpdateResult>{
    return (await this.execRepository).update(id, infoUpdate)
  }
}