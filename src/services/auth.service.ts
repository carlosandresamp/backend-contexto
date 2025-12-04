import prisma from "../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async register(name: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: { name, email, password: hashed },
    });
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuário não encontrado");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Senha incorreta");

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET", {
      expiresIn: "1d",
    });

    return { token };
  }
}