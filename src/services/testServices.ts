import { testsRepository } from "../repositories/testsRepository.js";

async function truncate() {
  await testsRepository.truncate();
}

async function seed() {
  await testsRepository.seed();
}

export const testsService = {
  truncate,
  seed,
};