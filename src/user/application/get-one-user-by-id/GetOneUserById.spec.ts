import { MockProxy, mock } from 'jest-mock-extended';
import { GetOneUserById } from './GetOneUserById';
import { UserRepository } from '../../domain/UserRepository';
import { NotFound } from '../../../shared/domain/exceptions/NotFound';
import { UserMother } from '../../../../test/user/domain/UserMother';

describe('GetOneUserById', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: GetOneUserById;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new GetOneUserById(mockRepository);
  });

  it('should return a user by the id sent', async () => {
    const userMock = UserMother.create();
    mockRepository.getOneById.mockResolvedValue(userMock);

    const { id, name, email } = userMock.toPrimitives();

    await expect(SUT.execute(id)).resolves.toEqual({ id, name, email });
  });

  it('should throw an error if there is not user with the id sent', async () => {
    mockRepository.getOneById.mockResolvedValue(undefined);

    const notExistId = 'notExist';

    await expect(SUT.execute(notExistId)).rejects.toThrow(NotFound);
  });
});
