import supertest from "supertest";
import app from "../src/app.js"
import {prisma} from "../src/database.js"

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});

describe ("Recommendation test suite", () => {
  it ("given an name and youtube link, create recommendation", async () => {
    const createRecomendationInput = {
      name: `UNIQUE random name ${new Date().getTime()}`,
      youtubeLink: 'https://www.youtube.com/watch?v=vik-PASUVuE'
    }
    const response = await supertest(app).post(`/recommendations/`).send(createRecomendationInput);
    expect(response.status).toBe(201)
  });

  it ("given an invalid name and/or invalid youtube link, fail to create recommendation", async () => {
    const createRecomendationInput = {
      name: false,
      youtubeLink: false
    }
    const response = await supertest(app).post(`/recommendations/`).send(createRecomendationInput);
    expect(response.error).not.toBe(null)
  });

  it ("return all the recommendations", async () => {
    const response = await supertest(app).get(`/recommendations/`);
    expect(response.status).toBe(200)
  });

  it ("return a random recommendation", async () => {
    const response = await supertest(app).get('/recommendations/random');
    expect(response.status).toBe(200)
    expect(response.body.length).not.toBe(null)
  });

  it ("return the top voted recommendation", async () => {
    const response = await supertest(app).get(`/recommendations/top/1`);
    expect(response.status).toBe(200)
    expect(response.body.length).not.toBe(null)
  });

  it ("get a recommendation by id", async () => {
    const response = await supertest(app).get(`/recommendations/1`);
    expect(response.status).toBe(200)
    expect(response.body.length).not.toBe(null)
  });

  it ("upvote a recommendation by id", async () => {
    const response = await supertest(app).post(`/recommendations/1/upvote`);
    expect(response.status).toBe(200)
  });

  it ("downvote a recommendation by id", async () => {
    const response = await supertest(app).post(`/recommendations/1/downvote`);
    expect(response.status).toBe(200)
  });
});
