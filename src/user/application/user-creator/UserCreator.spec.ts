import { MockProxy, mock } from 'jest-mock-extended';
import { UserCreator } from './UserCreator';
import { UserCreatorRequest } from './UserCreatorRequest';
import { UserRepository } from '../../domain/UserRepository';
import { InvalidArgument } from '../../../shared/domain/exceptions/InvalidArguments';
import { UserMother } from '../../../../test/user/domain/UserMother';

describe('UserCreator', () => {
  let mockRepository: MockProxy<UserRepository>;
  let SUT: UserCreator;

  beforeEach(() => {
    mockRepository = mock();
    SUT = new UserCreator(mockRepository);
  });

  it('should create a user without throwing errors when all data is valid', async () => {
    const user = UserMother.create();

    const request: UserCreatorRequest = {
      ...user.toPrimitives(),
    };

    await expect(SUT.execute(request)).resolves.not.toThrow();
    expect(mockRepository.save.bind(mockRepository)).toHaveBeenCalledWith(
      UserMother.create(request),
    );
  });

  it('should throws an error when creating a user with an invalid uuid', async () => {
    const user = UserMother.create();

    const invalidId = 'invalid';

    const request: UserCreatorRequest = {
      ...user.toPrimitives(),
      id: invalidId,
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid name', async () => {
    const user = UserMother.create();

    const request: UserCreatorRequest = {
      ...user.toPrimitives(),
      name: '',
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid email', async () => {
    const user = UserMother.create();

    const invalidEmail = 'invalid';

    const request: UserCreatorRequest = {
      ...user.toPrimitives(),
      email: invalidEmail,
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });

  it('should throws an error when creating a user with an invalid password', async () => {
    const user = UserMother.create();

    const request: UserCreatorRequest = {
      ...user.toPrimitives(),
      password: '',
    };

    await expect(SUT.execute(request)).rejects.toThrow(InvalidArgument);
    expect(mockRepository.save.bind(mockRepository)).not.toHaveBeenCalled();
  });
});
