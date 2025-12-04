import Fastify from "fastify";
import { authRoutes } from "./routes/auth.routes";
import { wordRoutes } from "./routes/word.routes";
import { attemptRoutes } from "./routes/attempt.routes";
import { adminRoutes } from "./routes/admin.routes";
import { loggerMiddleware } from "./middlewares/logger.middleware";

export const app = Fastify();

app.addHook("preHandler", loggerMiddleware);

app.register(authRoutes);
app.register(wordRoutes);
app.register(attemptRoutes);
app.register(adminRoutes);