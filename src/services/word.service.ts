import prisma from "../prisma";

export class WordService {
  async getToday() {
    const now = new Date();

    const start = new Date(now.setHours(0, 0, 0, 0));
    const end = new Date(now.setHours(23, 59, 59, 999));

    const word = await prisma.wordOfTheDay.findFirst({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    return {
      length: word?.word.length ?? 0,
      date: new Date().toISOString().split("T")[0],
    };
  }

  async create(word: string) {
    const today = new Date().toISOString().split("T")[0];

    return prisma.wordOfTheDay.create({
      data: { word, date: new Date(today) },
    });
  }
}
