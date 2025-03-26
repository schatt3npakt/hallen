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
    this.#initState();
    this.#mountApp();
    this.#initRouter();
    this.#initDb();
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
    const state = new AppState();
    state.init();
    this.state = state;
  }
  #initDb() {
    const db = new Db(this);
    db.init();
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
