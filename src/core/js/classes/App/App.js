import { AppState } from "./AppState.js";
import { Router } from "../Router.js";
import { TitleController } from "../../controller/TitleController.js";
import { MainMenuController } from "../../controller/MainMenuController.js";

/**
 * @class App
 * @classdesc The main app instance that includes all subservices
 */
export class App {
  /**
   * @property state
   * @type {Object}
   * @description The application state. Singleton instance of AppState class
   */
  #state;
  /**
   * @property router
   * @type {Object}
   * @description The application router. Holds singleton application router instance.
   */
  router;
  /**
   * @property rootElement
   * @type {HTMLElement}
   * @description The root element in which the app is mounted
   */
  #rootElement;

  /**
   * @method init
   * @description Initializes the app class and subservices.
   * @returns {void}
   */
  init() {
    this.#initState();
    this.#mountApp();
    this.#initRouter();

    this.#state.setState("IDLE");
  }
  /**
   * @method #mountApp
   * @description mounts application to root element
   * @returns {void}
   */
  #mountApp() {
    const $re = document.getElementById("app");
    if ($re === null) {
      throw new Error("App: No app root element found in document.");
    }
    this.#rootElement = $re;
  }
  /**
   * @method #initControllers
   * @description init all controllers for event handler application
   * @returns {void}
   */
  #initControllers() {
    const titleController = new TitleController(this);
    titleController.init();
    const mainMenuController = new MainMenuController(this);
    mainMenuController.init();
  }
  /**
   * @method #initRouter
   * @description starts the router and navigates to first view
   * @returns {void}
   */
  #initRouter() {
    const router = new Router(this);
    this.router = router;
    this.router.init();
    this.router.navigateTo("title");
  }
  /**
   * @method #initState
   * @description inits the app state
   * @returns {void}
   */
  #initState() {
    const state = new AppState();
    state.init();
    this.#state = state;
  }
  /**
   * @method render
   * @param {string} templateString
   * @description render the passed template view to the root element
   * @returns {void}
   */
  render(templateString) {
    this.#rootElement.innerHTML = templateString;
    this.#initControllers();
  }
}
