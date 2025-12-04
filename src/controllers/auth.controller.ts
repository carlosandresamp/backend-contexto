import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  register = async (req, reply) => {
    const { name, email, password } = req.body;
    const user = await service.register(name, email, password);
    reply.send(user);
  };

  login = async (req, reply) => {
    const { email, password } = req.body;
    const token = await service.login(email, password);
    reply.send(token);
  };
}