import { AuthLink, Prisma } from '@prisma/client'

export interface AuthLinkRepository {
  findByCode(code: string): Promise<AuthLink | null>
  createAuthLink(data: Prisma.AuthLinkUncheckedCreateInput): Promise<AuthLink>

  deleteCode(code: string): Promise<void>
}
