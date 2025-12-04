import { WordService } from "../services/word.service";

const service = new WordService();

export class AdminController {
  createWord = async (req, reply) => {
    reply.send(await service.create(req.body.word));
  };
}