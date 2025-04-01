import { loadHtml } from "../utils/loadHtml.js";

export class Router {
  constructor() {
    this.$rootElement = document.getElementById("hallenApp");
  }

  async init() {
    this.routes = {
      game: await loadHtml("./core/html/views/game.html"),
      mainmenu: await loadHtml("./core/html/views/mainmenu.html"),
      options: await loadHtml("./core/html/views/options.html"),
      saves: await loadHtml("./core/html/views/saves.html"),
      title: await loadHtml("./core/html/views/title.html"),
    };
    this.currentPageTemplate = this.routes.title;
  }

  navigateTo(routeName) {
    this.$rootElement.innerHTML = this.routes[routeName];
    this.currentPageTemplate = this.routes[routeName];
  }
  refresh() {
    this.$rootElement.innerHTML = this.currentPageTemplate;
  }
}
