import { jest } from "@jest/globals";
import { recommendationService } from "../src/services/recommendationsService";
import { recommendationRepository } from "../src/repositories/recommendationRepository";

const createRecomendationInput = {
  name: `UNIQUE random name ${new Date().getTime()}`,
  youtubeLink: 'https://www.youtube.com/watch?v=vik-PASUVuE'
}

// const invalidCreateRecomendationInput = {
//   name: `Not unique name`,
//   youtubeLink: 'https://youtu.be/vik-PASUVuE',
// }

jest.mock('../src/repositories/recommendationRepository');

describe('insert function test suit', () => {
  it ('given valid input, should insert a recommendation', async () => {
    jest.spyOn(recommendationRepository, "findByName")
    .mockImplementationOnce(() : any => {})

    jest.spyOn(recommendationRepository, 'create')
    .mockImplementationOnce(() : any => {})

    await recommendationService.insert(createRecomendationInput);
    expect(recommendationRepository.create).toBeCalled;
    expect(recommendationRepository.findByName).toBeCalled;
  });

  it ('given invalid input, should fail insert a recommendation', async () => {
    jest.spyOn(recommendationRepository, "findByName")
    .mockImplementationOnce(() : any => {})

    jest.spyOn(recommendationRepository, 'create')
    .mockImplementationOnce(() : any => {})

    await recommendationService.insert(createRecomendationInput);
    expect(recommendationRepository.create).toBeCalled;
    expect(recommendationRepository.findByName).toBeCalled;
  });
});
