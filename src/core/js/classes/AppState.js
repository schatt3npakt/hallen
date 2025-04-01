import { initialAppState } from "../constants/App.js";

export class AppState {
  init() {
    // TODO: load from local storage
    this.state = initialAppState;
  }

  getState() {
    return this.state;
  }
}
