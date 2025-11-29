import { MockProxy, mock } from 'jest-mock-extended';
import { UserMother } from '../../../../test/user/domain/UserMother';
import { UserRepository } from '../../domain/UserRepository';
import { GetAllUsers } from './GetAllUsers';

describe('GetAllUsers', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: GetAllUsers;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new GetAllUsers(mockRepository);
  });

  it('should get an empty list of users if there are no users', async () => {
    mockRepository.getAll.mockResolvedValue([]);

    await expect(SUT.execute()).resolves.toHaveLength(0);
  });

  it('should get two users from the list if there are two users in the database', async () => {
    mockRepository.getAll.mockResolvedValue([
      UserMother.create(),
      UserMother.create(),
    ]);

    await expect(SUT.execute()).resolves.toHaveLength(2);
  });

  it('should return the users without password', async () => {
    const userMock = UserMother.create();
    mockRepository.getAll.mockResolvedValue([userMock]);
    const { password, ...result } = userMock.toPrimitives();
    void password;

    await expect(SUT.execute()).resolves.toEqual([result]);
  });
});
