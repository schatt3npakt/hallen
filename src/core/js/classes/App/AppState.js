import { APP_STATES } from "../../constants/AppState.js";

export class AppState {
  #appInstance;
  #state;
  #savestates;

  constructor(appInstance) {
    this.#appInstance = appInstance;
  }
  getState() {
    return this.#state;
  }
  getSavestates() {
    return this.#savestates;
  }
  async init() {
    this.#state = "LOADING";
    const states = await this.#appInstance.db.readSavestates();
    this.#savestates = states;
  }
  setState(newState) {
    if (APP_STATES.includes(newState) === false) {
      throw new Error("Router: Setting unknown state: " + newState);
    }

    this.#state = newState;
  }
}
