import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;

let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('shold be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jamil Z',
      email: 'jamillz@hotmail.com',
    });

    expect(updateUser.name).toBe('Jamil Z');
    expect(updateUser.email).toBe('jamillz@hotmail.com');
  });

  it('shold not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@hotmail.com',
      password: '123121',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jamil Z',
        email: 'jamillzazu@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jamil Z',
      email: 'jamillz@hotmail.com',
      old_password: '123121',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('shold not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jamil Z',
        email: 'jamillz@hotmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jamil Z',
        email: 'jamillz@hotmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
