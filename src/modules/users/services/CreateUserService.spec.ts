import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('shold be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    await expect(
      createUser.execute({
        name: 'Jamil',
        email: 'jamillzazu@hotmail.com',
        password: '123121',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
