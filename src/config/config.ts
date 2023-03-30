import * as dotenv from 'dotenv'
import { Connection, ConnectionOptions, createConnection, DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { AppDataSource } from './data.source'

export abstract class ConfigServer {
  constructor(){
    const nodeNameEnv = this.createPathEnv(this.nodeEnv)
    dotenv.config({
      path:nodeNameEnv
    })
  }
  public getEnvironment(k:string):string | undefined {
    return process.env[k]
  }
  public getNumberEnv(k:string):number {
    return Number(this.getEnvironment(k))
  }
  public get nodeEnv():string {
    return this.getEnvironment('NODE_ENV')?.trim() || ""
  }
  public createPathEnv(path:string):string{
    const arrayEnv: string[] = ['env']
    if (path.length > 0) {
      const stringToArray = path.split('.')
      arrayEnv.unshift(...stringToArray)
    }
    return `.${arrayEnv.join('.')}`
  }


// PORT=7000
// DB_PORT=3312
// DB_HOST=localhost
// DB_DATABASE=codrr_db      
// DB_USER=ucodrr      
// DB_PASSWORD=secret

  // public get typeORMConfig():ConnectionOptions {
  //   return {
  //     type: 'mysql',
  //     host: this.getEnvironment("DB_HOST"),
  //     port: this.getNumberEnv("DB_PORT"),
  //     username: this.getEnvironment("DB_USER"),
  //     password: this.getEnvironment("DB_PASSWORD"),
  //     database: this.getEnvironment("DB_DATABASE"),
  //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //     migrations: [__dirname + "/../../migrations/*{.ts,.js}"],
  //     synchronize: true,
  //     logging: false,
  //     namingStrategy: new SnakeNamingStrategy()
  //   }
  // }
  get initConnect(): Promise<DataSource>{
    return AppDataSource.initialize()
  }
}

// const classe = new ConfigServer()