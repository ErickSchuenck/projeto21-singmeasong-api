import { prisma } from "../src/database.js";

async function main(){
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;

    await prisma.recommendation.createMany({
        data: [
            {
                id: 1,
                name: `UNIQUE random name 1 ${new Date().getTime()}`,
                youtubeLink: 'https://youtu.be/vik-PASUVuE',
                score: 8
            },
            {
                id: 2,
                name: `UNIQUE random name 2 ${new Date().getTime()}`,
                youtubeLink: 'https://www.youtube.com/watch?v=27Ufxnmwayo',
                score: 2
            },
            {
                id: 3,
                name: `UNIQUE random name 3 ${new Date().getTime()}`,
                youtubeLink: 'https://www.youtube.com/watch?v=ckI-Se1NFd4',
                score: 5
            },
            {
                id: 4,
                name: `UNIQUE random name 4 ${new Date().getTime()}`,
                youtubeLink: 'https://www.youtube.com/watch?v=H15YC7ICsCw',
                score: 3
            },
        ]
    });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})