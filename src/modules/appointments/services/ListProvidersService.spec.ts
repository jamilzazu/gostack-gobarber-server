import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('listProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('shold be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Jamil Zazu',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Jamil Zazu 2',
      email: 'jamillzazu2@hotmail.com',
      password: '123121',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jamil Zazu 3',
      email: 'jamillzazu3@hotmail.com',
      password: '123121',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
