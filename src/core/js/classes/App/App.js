import { AppState } from "./AppState.js";
import { Db } from "../Db.js";
import { Router } from "../Router.js";

export class App {
  state;
  router;
  db;
  #rootElement;

  exposeServices() {
    window.haRouter = this.router;
  }
  init() {
    this.#initDb();
    this.#initState();
    this.#mountApp();
    this.#initRouter();
    this.exposeServices();

    this.state.setState("IDLE");
  }
  #initRouter() {
    const router = new Router(this);
    this.router = router;
    this.router.init();
    this.router.navigateTo("title");
  }
  #initState() {
    const state = new AppState(this);
    state.init();
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
