import prisma from "../prisma";
import { similarity } from "../utils/similarity";

export class AttemptService {
  async attempt(userId: number, word: string) {
    const today = new Date().toISOString().split("T")[0];

    const w = await prisma.wordOfTheDay.findFirst({
      where: { date: new Date(today) }
    });

    const sim = similarity(word, w.word);
    const rank = Math.floor((1 - sim) * 50000);

    return prisma.attempt.create({
      data: {
        userId,
        word,
        similarity: sim,
        rank
      }
    });
  }

  async history(userId: number) {
    return prisma.attempt.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }
}