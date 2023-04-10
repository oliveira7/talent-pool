export class TalentAlreadyExists extends Error {
  constructor() {
    super('E-mail already exists');
  }
}