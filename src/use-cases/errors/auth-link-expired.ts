export class AuthLinkExpiredError extends Error {
  constructor() {
    super('O link de autenticação expirou! por favor faça o login novamente.')
  }
}
