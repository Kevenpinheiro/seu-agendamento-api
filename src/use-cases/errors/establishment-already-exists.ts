export class EstablishmentAlreadyExistsError extends Error {
  constructor() {
    super('Estabelecimento já cadastrado.')
  }
}
