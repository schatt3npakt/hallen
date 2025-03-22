import { AppState } from "./App/AppState.js";

export class App {
  #state;

  init() {
    const state = new AppState();
    state.init();
    this.#state = state;
    debugger;
  }
}
