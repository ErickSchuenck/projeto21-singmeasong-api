import { jest } from "@jest/globals";
import { recommendationService } from "../src/services/recommendationsService";
import { recommendationRepository } from "../src/repositories/recommendationRepository";

const createRecomendationInput = {
  name: `UNIQUE random name ${new Date().getTime()}`,
  youtubeLink: 'https://www.youtube.com/watch?v=vik-PASUVuE'
}

const recommendation = {
  id: 1,
  name: `UNIQUE random name ${new Date().getTime()}`,
  youtubeLink: 'https://youtu.be/vik-PASUVuE',
  score: 8
}

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
    .mockImplementationOnce(() : any => {});

    await recommendationService.upvote(1);

    expect(recommendationRepository.updateScore)
    .toBeCalled;
    expect(recommendationRepository.find)
    .toBeCalled();
  });
});

describe('downvote function test suit', () => {
  beforeEach(() => {
    jest.clearAllMocks().resetAllMocks()
  })

  it('should only downvote a recommendation', async () => {
    jest.spyOn(recommendationRepository, 'updateScore')
    .mockResolvedValue(recommendation);

    jest.spyOn(recommendationRepository, 'find')
    .mockResolvedValueOnce(recommendation);

    await recommendationService.downvote(1);

    expect(recommendationRepository.updateScore)
    .toBeCalled();
    expect(recommendationRepository.find)
    .toBeCalled();
    expect(recommendationRepository.remove)
    .not
    .toBeCalled
  });

  it('should remove a recommendation', async () => {
    const lowScoreRecommendation = {
      id: 9999,
      name: `UNIQUE random name ${new Date().getTime()}`,
      youtubeLink: 'https://youtu.be/vik-PASUVuE',
      score: -6
    }

    jest.spyOn(recommendationRepository, 'find')
    .mockImplementationOnce(() : any => {
      return lowScoreRecommendation
    });


    jest.spyOn(recommendationRepository, 'updateScore')
    .mockImplementationOnce(() : any => {
      return lowScoreRecommendation
    });

    jest.spyOn(recommendationRepository, 'remove')
    .mockImplementationOnce(() : any => {});

    await recommendationService.downvote(1);

    expect(recommendationRepository.remove).toBeCalled();
  });
});

describe('get by id function test suit', () => {
  it('should get an id', async () => {
    jest.spyOn(recommendationRepository, 'find')
    .mockImplementationOnce(() : any => {
      return recommendation
    });
    const result = await recommendationService.getById(1);
    expect(result).toEqual(recommendation)
  });

  it('given invalid id, should fail to get recommendation', async () => {
    jest.spyOn(recommendationRepository, 'find')
    .mockImplementationOnce(() : any => null);

    expect(recommendationService.getById(1)).rejects.toEqual({
      message: '',
      type: 'not_found',
    });
  });
});

describe('Find all recommendations', ()=>{
  it('should get all recommendations', 
  async () => {
    jest.spyOn(recommendationRepository, 'findAll')
    .mockImplementation(() : any => {});
    await recommendationService.get();
    expect(recommendationRepository.findAll)
    .toBeCalled
  });
});

describe('Get top recommendations', ()=>{
  it('should call the get amount by score function', 
  async () =>{
    jest.spyOn(recommendationRepository, 'getAmountByScore')
    .mockImplementationOnce(() : any => {})

    await recommendationService.getTop(1);
    
    expect(recommendationRepository.getAmountByScore)
    .toBeCalled
  });
});