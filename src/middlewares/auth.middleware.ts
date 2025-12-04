import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return reply.status(401).send({ error: "Token necessário" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "SECRET") as any;
    req.user = { id: decoded.id, role: decoded.role };
  } catch (e) {
    return reply.status(401).send({ error: "Token inválido" });
  }
}