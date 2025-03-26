import { loadHtml } from "../utils/loadHtml.js";

export const ROUTES = [
  {
    name: "title",
    template: await loadHtml("./core/html/views/title.html"),
  },
  {
    name: "mainmenu",
    template: await loadHtml("./core/html/views/mainmenu.html"),
  },
  {
    name: "game",
    template: await loadHtml("./core/html/views/game.html"),
  },
];
