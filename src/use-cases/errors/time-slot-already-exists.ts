export class TimeSlotAlreadyExistsError extends Error {
  constructor() {
    super('Já existe um mesmo horário para esse dia.')
  }
}
