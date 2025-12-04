import { WordController } from "../controllers/word.controller";

export async function wordRoutes(app) {
  const c = new WordController();
  app.get("/word-today", c.getToday);
}