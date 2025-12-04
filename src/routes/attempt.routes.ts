import { AttemptController } from "../controllers/attempt.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function attemptRoutes(app) {
  const c = new AttemptController();
  app.post("/attempt", { preHandler: authMiddleware }, c.attempt);
  app.get("/me/attempts", { preHandler: authMiddleware }, c.history);
}