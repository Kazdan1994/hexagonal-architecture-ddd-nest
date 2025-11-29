import { MockProxy, mock } from 'jest-mock-extended';
import { UserIdMother } from '../../../../test/user/domain/UserIdMother';
import { UserRepository } from '../../domain/UserRepository';
import { DeleteUser } from './DeleteUser';

describe('DeleteUser', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: DeleteUser;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new DeleteUser(mockRepository);
  });

  it('should delete a user by id sent', async () => {
    const id = UserIdMother.create().value;

    await SUT.execute(id);
    expect(mockRepository.delete.bind(mockRepository)).toHaveBeenCalledWith(id);
  });
});
