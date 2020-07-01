import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeMailProvider = new FakeMailProvider();

    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('shold be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jamillzazu@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('shold be able not be able to recovert a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jamillzazu@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jamil',
      email: 'jamillzazu@hotmail.com',
      password: '123121',
    });

    await sendForgotPasswordEmail.execute({
      email: 'jamillzazu@hotmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
