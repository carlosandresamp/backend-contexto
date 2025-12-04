import { AttemptService } from "../services/attempt.service";

const service = new AttemptService();

export class AttemptController {
  attempt = async (req, reply) => {
    const result = await service.attempt(req.user.id, req.body.word);
    reply.send(result);
  };

  history = async (req, reply) => {
    reply.send(await service.history(req.user.id));
  };
}
