export class TalentAlreadyExists extends Error {
  constructor() {
    super('Talent already exists.');
  }
}