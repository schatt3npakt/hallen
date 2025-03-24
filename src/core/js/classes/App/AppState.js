import { APP_STATES } from "../../constants/AppState.js";

/**
 * @class AppState
 * @classdesc The global application state that holds application in memory progress
 */
export class AppState {
  /**
   * @property state
   * @type {Object}
   * @description The application state. Holds state in key value pair
   */
  #state;

  /**
   * @method init
   * @description Initializes the application state instance
   * @returns {void}
   */
  init() {
    this.#state = "LOADING";
  }
  /**
   * @method getState
   * @description returns current application state
   * @returns {"LOADING" | "ERROR" | "IDLE"}
   */
  getState() {
    return this.#state;
  }
  /**
   * @method setState
   * @description set current application state
   * @param {"LOADING" | "ERROR" | "IDLE"} newState
   * @returns {void}
   */
  setState(newState) {
    if (APP_STATES.includes(newState) === false) {
      throw new Error("Router: Setting unknown state: " + newState);
    }

    this.#state = newState;
  }
}
