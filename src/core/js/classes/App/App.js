import { AppState } from "./AppState.js";

export class App {
  #state;

  init() {
    const state = new AppState();
    state.init();
    this.#state = state;

    // Init stuff...

    this.#state.setState("IDLE");
  }
}
