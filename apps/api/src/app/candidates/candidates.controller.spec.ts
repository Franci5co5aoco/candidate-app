import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';
import 'multer';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  const mockCandidatesService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [ {
        provide: CandidatesService,
        useValue: mockCandidatesService,
      } ] 
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call candidatesService.create with the correct parameters', async () => {
      const mockFile = { originalname: 'test.xlsx' };
      const mockBody = { name: 'John Doe'};
      await controller.create((mockFile as any), (mockBody as any));
      expect(mockCandidatesService.create).toHaveBeenCalledWith(mockBody, mockFile);
    });
  });

});
