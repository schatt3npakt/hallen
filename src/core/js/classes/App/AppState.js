import { APP_STATES } from "../../constants/AppState.js";

export class AppState {
  #state;

  init() {
    this.#state = "LOADING";
  }
  getState() {
    return this.#state;
  }
  setState(newState) {
    if (APP_STATES.includes(newState) === false) {
      throw new Error("Router: Setting unknown state: " + newState);
    }

    this.#state = newState;
  }
}
