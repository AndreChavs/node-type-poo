import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { BaseRouter } from "../shared/router/router";
import { AuthController } from "./controller/auth.controller";

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware);
  }

  routes(): void {
    this.router.post("/login", this.middleware.passAuth("login"), (req, res) =>
      this.controller.login(req, res)
    );
  }
}