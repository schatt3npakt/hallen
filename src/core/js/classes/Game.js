import { loadHtml } from "../utils/loadHtml.js";

/**
 * @class Game
 * @description The game class that handles game view rendering and interaction
 */
export class Game {
  /**
   * @property appInstance
   * @type {Object}
   * @description The application instance
   */
  #appInstance;
  /**
   * @property gameViewElement
   * @type {HTMLElement}
   * @description The root element of the game view
   */
  #gameViewElement;

  constructor(appInstance) {
    this.#appInstance = appInstance;
  }

  async init() {
    this.#appInstance.state.setState("LOADING");
    // TODO: Load from current savepoint
    const sceneHtml = await loadHtml("./scenes/1.html");
    this.#gameViewElement = document.getElementById("gameView");
    this.#gameViewElement.innerHTML = sceneHtml;
  }
}
