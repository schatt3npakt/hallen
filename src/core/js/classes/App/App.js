import { AppState } from "./AppState.js";
import { Db } from "../Db.js";
import { Router } from "../Router.js";

import { HallenGame } from "../../components/hallenGame.js";
import { HallenSaveManager } from "../../components/hallenSaveManager.js";

export class App {
  state;
  router;
  db;
  #rootElement;

  #defineCustomElements() {
    customElements.define("hallen-game", HallenGame);
    customElements.define("hallen-save-manager", HallenSaveManager);
  }
  #exposeServices() {
    window.hallenRouter = this.router;
    window.hallenState = this.state;
  }
  async init() {
    this.#mountApp();
    await this.#initDb();
    await this.#initState();
    this.#initRouter();
    this.#exposeServices();
    this.#defineCustomElements();

    this.state.setState("IDLE");
  }
  #initRouter() {
    const router = new Router(this);
    this.router = router;
    this.router.init();
    this.router.navigateTo("title");
  }
  async #initState() {
    const state = new AppState(this);
    await state.init();
    this.state = state;
  }
  async #initDb() {
    const db = new Db(this);
    await db.init();
    this.db = db;
  }
  #mountApp() {
    const $re = document.getElementById("app");
    if ($re === null) {
      throw new Error("App: No app root element found in document.");
    }
    this.#rootElement = $re;
  }
  render(templateString) {
    this.#rootElement.innerHTML = templateString;
  }
}
