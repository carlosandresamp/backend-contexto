import prisma from "../prisma";

export class WordService {
  async getToday() {
    const today = new Date().toISOString().split("T")[0];

    const word = await prisma.wordOfTheDay.findFirst({
      where: { date: new Date(today) }
    });

    return {
      length: word?.word.length ?? 0,
      date: today
    };
  }

  async create(word: string) {
    const today = new Date().toISOString().split("T")[0];

    return prisma.wordOfTheDay.create({
      data: { word, date: new Date(today) }
    });
  }
}