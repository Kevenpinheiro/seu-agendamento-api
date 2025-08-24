export class TimeNotAvailableError extends Error {
  constructor() {
    super('Não há horários disponível.')
  }
}
