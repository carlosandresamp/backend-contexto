import { FastifyRequest, FastifyReply } from "fastify";

export async function adminMiddleware(req: FastifyRequest, reply: FastifyReply) {
  if (req.user.role !== "admin") {
    return reply.status(403).send({ error: "Acesso negado: precisa ser admin" });
  }
}