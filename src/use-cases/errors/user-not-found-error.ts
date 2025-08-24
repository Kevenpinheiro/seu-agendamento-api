export class UserNotFoundError extends Error {
  constructor() {
    super('Não encontramos seus usuário')
  }
}
