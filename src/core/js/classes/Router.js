import { ROUTES } from "../constants/Router.js";
import { Game } from "./Game.js";

export class Router {
  #appInstance;
  #routes;

  constructor(appInstance) {
    this.#appInstance = appInstance;
  }

  getRoutes() {
    return this.#routes;
  }
  init() {
    this.#routes = ROUTES;
  }
  navigateTo(routeString) {
    const route = this.#routes.find(
      (routeItem) => routeItem.name === routeString
    );
    if (route === undefined) {
      throw new Error("Router: No matching route found: " + routeString);
    }

    this.#appInstance.render(route.template);

    if (route.name === "game") {
      const game = new Game(this.#appInstance);
      game.init();
    }
  }
}
