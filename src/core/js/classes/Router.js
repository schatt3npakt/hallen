import { ROUTES } from "../constants/Router.js";

export class Router {
  #appInstance;
  #routes;

  constructor(appInstance) {
    this.#appInstance = appInstance;
  }
  init() {
    this.#routes = ROUTES;
  }
  getRoutes() {
    return this.#routes;
  }
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
