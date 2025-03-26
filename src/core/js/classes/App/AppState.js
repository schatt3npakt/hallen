import { APP_STATES } from "../../constants/AppState.js";

export class AppState {
  #state;

  getState() {
    return this.#state;
  }
  init() {
    this.#state = "LOADING";
  }
  setState(newState) {
    if (APP_STATES.includes(newState) === false) {
      throw new Error("Router: Setting unknown state: " + newState);
    }

    this.#state = newState;
  }
}
