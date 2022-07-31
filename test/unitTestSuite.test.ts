import { jest } from "@jest/globals";
import { recommendationService } from "../src/services/recommendationsService";
import { recommendationRepository } from "../src/repositories/recommendationRepository";

const createRecomendationInput = {
  name: `UNIQUE random name ${new Date().getTime()}`,
  youtubeLink: 'https://www.youtube.com/watch?v=vik-PASUVuE'
}

const recommendation = {
  id: 1,
  name: `UNIQUE random name 1 ${new Date().getTime()}`,
  youtubeLink: 'https://youtu.be/vik-PASUVuE',
  score: 8
}



jest.mock('../src/repositories/recommendationRepository');

describe('insert function test suit', () => {
  it ('given valid input, should insert a recommendation', async () => {
    // jest.spyOn(recommendationRepository, "findByName")
    // .mockImplementationOnce(() : any => {})

    // jest.spyOn(recommendationRepository, 'create')
    // .mockImplementationOnce(() : any => {})

    await recommendationService.insert(createRecomendationInput);
    expect(recommendationRepository.create).toBeCalled;
    expect(recommendationRepository.findByName).toBeCalled;
  });

  it ('should fail insert a duplicated recommendation', async () => {

    const invalidCreateRecomendationInput = {
    name: `Not unique name`,
    youtubeLink: 'https://youtu.be/vik-PASUVuE',
    }

    jest.spyOn(recommendationRepository, "findByName")
    .mockImplementationOnce(() : any => {
      return {
        id: 1,
        name: `Not unique name`,
        youtubeLink: 'https://youtu.be/vik-PASUVuE',
        upvotes: 0
      }
    });

    const promise = recommendationService.insert(invalidCreateRecomendationInput)
    expect(promise).rejects.toEqual({
      message: 'Recommendations names must be unique',
      type: 'conflict'
    })
  });
});

describe('upvote function test suit', () => {
  it('should upvote a recommendation', async () => {
    jest.spyOn(recommendationRepository, 'find')
    .mockImplementationOnce(() : any => {
      return recommendation
    });

    jest.spyOn(recommendationRepository, 'updateScore')
    .mockImplementationOnce(() : any => {
      return recommendation
    });


  });
});
