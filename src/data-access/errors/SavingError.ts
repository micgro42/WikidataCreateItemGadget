export default class SavingError extends Error {
  public readonly errors: readonly { type: string; info: unknown }[];

  public constructor(errors: readonly { type: string; info: unknown }[]) {
    super('Saving failed.');
    this.errors = errors;
  }
}
