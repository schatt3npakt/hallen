import loadHtml from "../utils/loadHtml.js";

export const ROUTES = [
  {
    name: "title",
    template: await loadHtml("./core/html/views/title.html"),
  },
];
