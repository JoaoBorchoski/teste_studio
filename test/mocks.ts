import { TestUtils } from './test-utils';

export const mockUsersService = {
  create: jest.fn().mockResolvedValue(TestUtils.createMockUser()),
  findAll: jest.fn().mockResolvedValue([TestUtils.createMockUser()]),
  findOne: jest.fn().mockResolvedValue(TestUtils.createMockUser()),
  update: jest.fn().mockResolvedValue(TestUtils.createMockUser()),
  remove: jest.fn().mockResolvedValue({ message: 'User deleted successfully' }),
};

export const mockAuthService = {
  register: jest.fn().mockResolvedValue({
    user: TestUtils.createMockUser(),
    access_token: 'mock-jwt-token',
  }),
  login: jest.fn().mockResolvedValue({
    user: TestUtils.createMockUser(),
    access_token: 'mock-jwt-token',
  }),
  validateUser: jest.fn().mockResolvedValue(TestUtils.createMockUser()),
};

export const mockEmpreendimentosService = {
  create: jest.fn().mockResolvedValue(TestUtils.createMockEmpreendimento()),
  findAll: jest.fn().mockResolvedValue([TestUtils.createMockEmpreendimento()]),
  findOne: jest.fn().mockResolvedValue(TestUtils.createMockEmpreendimento()),
  update: jest.fn().mockResolvedValue(TestUtils.createMockEmpreendimento()),
  remove: jest.fn().mockResolvedValue({ message: 'Empreendimento deleted successfully' }),
};

export const mockUnidadesService = {
  create: jest.fn().mockResolvedValue(TestUtils.createMockUnidade()),
  findAll: jest.fn().mockResolvedValue([TestUtils.createMockUnidade()]),
  findWithFilters: jest.fn().mockResolvedValue([TestUtils.createMockUnidade()]),
  findOne: jest.fn().mockResolvedValue(TestUtils.createMockUnidade()),
  update: jest.fn().mockResolvedValue(TestUtils.createMockUnidade()),
  remove: jest.fn().mockResolvedValue({ message: 'Unidade deleted successfully' }),
};

export const mockFavoritosService = {
  create: jest.fn().mockResolvedValue(TestUtils.createMockFavorito()),
  findAll: jest.fn().mockResolvedValue([TestUtils.createMockFavorito()]),
  remove: jest.fn().mockResolvedValue({ message: 'Favorito removed successfully' }),
};

export const mockRelatoriosService = {
  getContagemPorStatus: jest.fn().mockResolvedValue([
    { status: 'disponivel', count: 10 },
    { status: 'vendido', count: 5 },
  ]),
  getRelatorioPorCidade: jest.fn().mockResolvedValue([
    { cidade: 'São Paulo', count: 8 },
    { cidade: 'Rio de Janeiro', count: 7 },
  ]),
};

export const mockAppService = {
  getHello: jest.fn().mockReturnValue('Hello World!'),
};

export const mockJwtAuthGuard = {
  canActivate: jest.fn().mockReturnValue(true),
};

