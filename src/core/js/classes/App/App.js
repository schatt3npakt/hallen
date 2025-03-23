import { AppState } from "./AppState.js";
import { Router } from "../Router.js";

export class App {
  #state;
  #router;
  #rootElement;

  init() {
    const state = new AppState();
    state.init();
    this.#state = state;

    const $re = document.getElementById("app");
    if ($re === null) {
      throw new Error("App: No app root element found in document.");
    }
    this.#rootElement = $re;

    const router = new Router(this);
    this.#router = router;
    this.#router.init();
    this.#router.navigateTo("title");

    this.#state.setState("IDLE");
  }

  render(templateString) {
    this.#rootElement.innerHTML = templateString;
  }
}
