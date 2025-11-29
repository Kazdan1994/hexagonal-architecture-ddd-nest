import { MockProxy, mock } from 'jest-mock-extended';
import { UpdateUser } from './UpdateUser';
import { UserUpdateRequest } from './UserUpdateRequest';
import { UserRepository } from '../../domain/UserRepository';
import { InvalidArgument } from '../../../shared/domain/exceptions/InvalidArguments';
import { UserMother } from '../../../../test/user/domain/UserMother';

describe('UpdateUser', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: UpdateUser;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new UpdateUser(mockRepository);
  });

  it('should update a user without throwing errors when all data is valid', async () => {
    const user = UserMother.create();

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
    };

    await expect(SUT.execute(request)).resolves.not.toThrow();
    expect(mockRepository.save.bind(mockRepository)).toHaveBeenCalledWith(
      UserMother.create(request),
    );
  });

  it('should throws an error when updating a user with an invalid uuid', async () => {
    const user = UserMother.create();

    const invalidId = 'invalid';

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      id: invalidId,
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid name', async () => {
    const user = UserMother.create();

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      name: '',
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid email', async () => {
    const user = UserMother.create();

    const invalidEmail = 'invalid';

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      email: invalidEmail,
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid password', async () => {
    const user = UserMother.create();

    const request: UserUpdateRequest = {
      ...user.toPrimitives(),
      password: '',
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });
});
