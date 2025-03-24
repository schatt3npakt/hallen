import { ROUTES } from "../constants/Router.js";

/**
 * @class Router
 * @classdesc The app router. Holds app routes and is responsible for navigation.
 */
export class Router {
  /**
   * @property appInstance
   * @type {Object}
   * @description The application instance
   */
  #appInstance;
  /**
   * @property routes
   * @type {Array}
   * @description available routes for the application
   */
  #routes;

  /**
   *
   * @param {Object} appInstance The application instance
   */
  constructor(appInstance) {
    this.#appInstance = appInstance;
  }
  /**
   * @method init
   * @description initialize app router and set routes
   * @returns {void}
   */
  init() {
    this.#routes = ROUTES;
  }
  /**
   * @method getRoutes
   * @description returns Array holding all app routes
   * @returns {Array}
   */
  getRoutes() {
    return this.#routes;
  }
  /**
   * @method navigateTo
   * @param {string} routeString
   * @description matches passed route string to route object and triggers the render.
   * @returns {void}
   */
  navigateTo(routeString) {
    const route = this.#routes.find(
      (routeItem) => routeItem.name === routeString
    );
    if (route === undefined) {
      throw new Error("Router: No matching route found: " + route);
    }

    this.#appInstance.render(route.template);
  }
}
