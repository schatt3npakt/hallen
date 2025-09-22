import { AppState } from "./AppState.js";
import { Db } from "./Db.js";
import { Router } from "./Router.js";
import { HallenSaveManager } from "../components/hallenSaveManager.js";
import { HallenGame } from "../components/hallenGame.js";

export class App {
  async init() {
    await this.initRouter();
    await this.initDb();
    await this.initAppState();
    this.registerComponents();
  }
  async initAppState() {
    this.appState = new AppState();
    this.appState.init();
    window.hallen.state = this.appState;
  }
  async initDb() {
    return new Promise((resolve, reject) => {
      const db = new Db("hallen", "hallen");
      db.openDb()
        .then(() => {
          console.log("Database opened successfully");
          window.hallen.db = db;
          resolve();
        })
        .catch((error) => {
          console.error("Error opening database:", error);
          reject(error);
        });
    });
  }
  async initRouter() {
    const router = new Router();
    await router.init();
    router.navigateTo("title");
    window.hallen.router = router;
  }
  registerComponents() {
    customElements.define("hg-save-manager", HallenSaveManager);
    customElements.define("hg-game", HallenGame);
  }
}
