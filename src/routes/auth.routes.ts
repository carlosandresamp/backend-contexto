import { AuthController } from "../controllers/auth.controller";

export async function authRoutes(app) {
  const c = new AuthController();
  app.post("/register", c.register);
  app.post("/login", c.login);
}