import { loadHtml } from "../utils/loadHtml.js";

export class Game {
  #appInstance;
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
