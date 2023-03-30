import { UserController } from "./controller/user.controller";
import { BaseRouter } from "../shared/router/router";
import { UserMiddleware } from "./middleware/user.middleware";


export class UserRouter extends BaseRouter<UserController, UserMiddleware>{
  constructor(){
    super(UserController, UserMiddleware)
    // this.routes()
  }
  public routes(): void {
    this.router.get(
      '/users', 
      this.middleware.passAuth('jwt') 
      ,(req, res) => this.controller.getUsers(req, res)
    );

    this.router.get(
      '/user/:id', 
      this.middleware.passAuth('jwt'), 
      (req, res) => this.controller.getUserById(req, res)
    );
    
    this.router.get(
      '/userRelation/:id',
       this.middleware.passAuth('jwt'),
      (req, res) => this.controller.getUserWithRelationById(req, res)
    );

    this.router.post(
      '/user',
      (req, res, next) => [this.middleware.userValidator(req, res, next)], 
      (req, res) => this.controller.createUser(req, res)
    );

    this.router.put(
      '/user/:id',
      this.middleware.passAuth("jwt"),
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)], 
      (req, res) => this.controller.updateUser(req, res)
    );

    this.router.delete(
      '/user/:id',
      this.middleware.passAuth("jwt"),
      (req, res, next) => [this.middleware.checkAdminRole(req, res, next)], 
      (req, res) => this.controller.deleteUser(req, res)
      );

  }
}