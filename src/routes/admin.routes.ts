import { AdminController } from "../controllers/admin.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

export async function adminRoutes(app) {
  const c = new AdminController();

  app.post(
    "/admin/word",
    { preHandler: [authMiddleware, adminMiddleware] },
    c.createWord
  );
}