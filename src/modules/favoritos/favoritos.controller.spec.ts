import { Test, TestingModule } from '@nestjs/testing';
import { FavoritosController } from './favoritos.controller';
import { FavoritosService } from './favoritos.service';
import { mockFavoritosService } from '../../../test/mocks';
import { TestUtils } from '../../../test/test-utils';

describe('FavoritosController', () => {
  let controller: FavoritosController;
  let favoritosService: FavoritosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritosController],
      providers: [
        {
          provide: FavoritosService,
          useValue: mockFavoritosService,
        },
      ],
    }).compile();

    controller = module.get<FavoritosController>(FavoritosController);
    favoritosService = module.get<FavoritosService>(FavoritosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /favoritos', () => {
    it('should add a unidade to favorites', async () => {
      const createFavoritoDto = {
        unidadeId: '1',
      };

      const mockRequest = TestUtils.createMockRequest();
      const expectedFavorito = TestUtils.createMockFavorito();
      mockFavoritosService.create.mockResolvedValue(expectedFavorito);

      const result = await controller.create(createFavoritoDto, mockRequest);

      expect(result).toEqual(expectedFavorito);
      expect(mockFavoritosService.create).toHaveBeenCalledWith(createFavoritoDto, mockRequest.user.id);
    });
  });

  describe('GET /favoritos', () => {
    it('should return user favorites', async () => {
      const mockRequest = TestUtils.createMockRequest();
      const filterDto = {
        page: 1,
        limit: 10,
      };

      const expectedFavoritos = [TestUtils.createMockFavorito()];
      mockFavoritosService.findAll.mockResolvedValue(expectedFavoritos);

      const result = await controller.findAll(mockRequest, filterDto);

      expect(result).toEqual(expectedFavoritos);
      expect(mockFavoritosService.findAll).toHaveBeenCalledWith(mockRequest.user.id, filterDto);
    });

    it('should return user favorites without filters', async () => {
      const mockRequest = TestUtils.createMockRequest();
      const filterDto = {};

      const expectedFavoritos = [TestUtils.createMockFavorito()];
      mockFavoritosService.findAll.mockResolvedValue(expectedFavoritos);

      const result = await controller.findAll(mockRequest, filterDto);

      expect(result).toEqual(expectedFavoritos);
      expect(mockFavoritosService.findAll).toHaveBeenCalledWith(mockRequest.user.id, filterDto);
    });
  });

  describe('DELETE /favoritos/:unidadeId', () => {
    it('should remove a unidade from favorites', async () => {
      const unidadeId = '1';
      const mockRequest = TestUtils.createMockRequest();
      const expectedResult = { message: 'Favorito removed successfully' };
      mockFavoritosService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove(unidadeId, mockRequest);

      expect(result).toEqual(expectedResult);
      expect(mockFavoritosService.remove).toHaveBeenCalledWith(unidadeId, mockRequest.user.id);
    });
  });
});