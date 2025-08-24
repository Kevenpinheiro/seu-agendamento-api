import { AuthLinkRepository } from '@/repositories/auth-link-repository'
import { UserNotFoundError } from './errors/user-not-found-error'
import { AuthLinkExpiredError } from './errors/auth-link-expired'
import dayjs from 'dayjs'

export interface AuthenticateFromLinkRequest {
  code: string
}

export interface AuthenticateFromLinkResponse {
  userId: string
}

export class AuthenticateFromLinkUseCase {
  constructor(private authLinkRepository: AuthLinkRepository) {}

  async execute({
    code,
  }: AuthenticateFromLinkRequest): Promise<AuthenticateFromLinkResponse> {
    const authLinkFromCode = await this.authLinkRepository.findByCode(code)

    if (!authLinkFromCode) {
      throw new UserNotFoundError()
    }

    const daysSinceAuthLinkWasCreated = dayjs().diff(
      authLinkFromCode.createdAt,
      'days',
    )

    if (daysSinceAuthLinkWasCreated > 7) {
      throw new AuthLinkExpiredError()
    }

    await this.authLinkRepository.deleteCode(authLinkFromCode.code)

    return {
      userId: authLinkFromCode.userId,
    }
  }
}
