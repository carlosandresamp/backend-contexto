import { WordService } from "../services/word.service";
const service = new WordService();

export class WordController {
  getToday = async (_, reply) => reply.send(await service.getToday());
}