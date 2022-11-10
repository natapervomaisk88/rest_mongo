class Result {
  constructor(error, message) {
    this.error = error;

    this.message = message;
  }
}

export class Ok extends Result {
  constructor(message, payload = undefined) {
    super(false, message);

    if (payload) this.payload = payload;
  }
}

export class Error extends Result {
  constructor(message) {
    super(true, message);
  }
}
