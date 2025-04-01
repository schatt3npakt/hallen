import { Router } from "./Router.js";
import { Db } from "./Db.js";
import { HallenSaveManager } from "../components/hallenSaveManager.js";
import { AppState } from "./AppState.js";

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
    window.hallenState = this.appState;
  }
  async initRouter() {
    const router = new Router();
    await router.init();
    router.navigateTo("title");
    window.hallenRouter = router;
  }

  async initDb() {
    return new Promise((resolve, reject) => {
      const db = new Db("hallen", "hallen");
      db.openDb()
        .then(() => {
          console.log("Database opened successfully");
          window.hallenDb = db;
          resolve();
        })
        .catch((error) => {
          console.error("Error opening database:", error);
          reject(error);
        });
    });
  }
  registerComponents() {
    customElements.define("hallen-save-manager", HallenSaveManager);
  }
}
