export class AppState {
  /**
   * @property the app's current state. LOADING, IDLE or ERROR.
   */
  #state;

  init() {
    this.#state = "LOADING";
  }
}
