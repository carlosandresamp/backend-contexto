import { AuthService } from "../services/auth.service";

const service = new AuthService();

export class AuthController {
  register = async (req, reply) => {
    const { name, email, password, role } = req.body;
    const user = await service.register(name, email, password, role);
    reply.send(user);
  };

  login = async (req, reply) => {
    const { email, password } = req.body;
    const token = await service.login(email, password);
    reply.send(token);
  };
}
