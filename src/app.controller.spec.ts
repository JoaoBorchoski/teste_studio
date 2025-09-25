import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mockAppService } from '../test/mocks';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('GET /', () => {
    it('should return "Hello World!"', () => {
      const result = appController.getHello();
      
      expect(result).toBe('Hello World!');
      expect(mockAppService.getHello).toHaveBeenCalled();
    });
  });
});
