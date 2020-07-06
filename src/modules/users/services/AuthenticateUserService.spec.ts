import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

let authenticateUser: AuthenticateUserService;

beforeEach(() => {
  fakeUsersRepository = new FakeUsersRepository();

  fakeHashProvider = new FakeHashProvider();

  createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

  authenticateUser = new AuthenticateUserService(
    fakeUsersRepository,
    fakeHashProvider,
  );
});

describe('AuthenticateUser', () => {
  it('shold be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    const response = await authenticateUser.execute({
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shold not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jamillzazu@hotmail.com',
        password: '123121',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    await expect(
      authenticateUser.execute({
        email: 'jamillzazu@hotmail.com',
        password: '1231212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
