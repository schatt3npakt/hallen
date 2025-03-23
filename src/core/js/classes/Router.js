import { ROUTES } from "../constants/Router.js";

export class Router {
  #routes;

  init() {
    this.#routes = ROUTES;
  }
  getRoutes() {
    return this.#routes;
  }
}
