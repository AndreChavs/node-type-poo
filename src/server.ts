import express from "express";
import "reflect-metadatanpm";
import morgan from "morgan";
import cors from 'cors';
import { UserRouter } from "./user/user.router";
import { ConfigServer } from "./config/config";
import { Connection, createConnection, DataSource } from "typeorm";
import { LoginStrategy } from "./auth/strategies/login.strategy";


class Server extends ConfigServer{
  public app: express.Application = express();
  private port: number = this.getNumberEnv("PORT");

  constructor(){
    super()
    this.app.use(express.json())
    this.app.use(express.urlencoded({extended: true}))
    this.app.use(morgan('dev'))
    this.app.use(cors())
  
    this.passportUse()
    
    this.dbConnect()


    this.api('/api',{mensage: `Olá Mundo!`})

    this.app.use('/api/v2', this.routers())
    
    this.listen()
  }
  

  public api(rota:string, json:object){
    this.app.get(rota, (req, res) => {
      res.status(200).json(json)
    })
  }
  routers(): Array<express.Router>{
    return [new UserRouter().router]
  }

  passportUse(){
    return [new LoginStrategy().use]
  }
 
  async dbConnect(): Promise<DataSource | void>{
    return this.initConnect.then( () => {
      console.log(`Connect Success`)
    }).catch((error) => {
      console.error(error)
    })
  }

  public listen(){
    this.app.listen(this.port, () => {
      console.log(`Server rodando na porta ${this.port}`)
    })
  }
}

new Server()