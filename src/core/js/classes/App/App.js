import { AppState } from "./AppState.js";
import { Router } from "../Router.js";

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
  state;
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
    this.exposeServices();

    this.state.setState("IDLE");
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
    this.state = state;
  }
  /**
   * @method render
   * @param {string} templateString
   * @description render the passed template view to the root element
   * @returns {void}
   */
  render(templateString) {
    this.#rootElement.innerHTML = templateString;
  }
  /**
   * @method exposeServices
   * @description Write app subservices into window
   * @returns {void}
   */
  exposeServices() {
    window.haRouter = this.router;
  }
}
