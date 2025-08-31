import { randomUUID } from 'node:crypto'
import { env } from '@/env'

import { AuthLinkRepository } from '@/repositories/auth-link-repository'

import { UserNotFoundError } from './errors/user-not-found-error'
import { mail } from '@/lib/nodemailer/mail'

import { UserRepository } from '@/repositories/user-repository'

export interface SendAuthLinkUseCaseRequest {
  email: string
}

export interface SendAuthLinkUseCaseResponse {
  authLink: string
}

export class SendAuthLinkUseCase {
  constructor(
    private userRepository: UserRepository,
    private authLinkRepository: AuthLinkRepository,
  ) {}

  async execute({
    email,
  }: SendAuthLinkUseCaseRequest): Promise<SendAuthLinkUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const authLinkCode = randomUUID()

    await this.authLinkRepository.createAuthLink({
      userId: user.id,
      code: authLinkCode.toString(),
    })

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)

    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)

    const info = await mail.sendMail({
      from: {
        name: 'Seu Agendamento',
        address: 'contato.kevenpinheiro@gmail.com',
      },
      to: email,
      subject: 'Verificação de e-mail Seu Agendamento',
      text: `Acesse sua área de agendamentos através deste link!: ${authLink.toString()}`,
    })

    // TODO: Enviar o link por SMS

    return {
      authLink: authLink.toString(),
    }
  }
}
