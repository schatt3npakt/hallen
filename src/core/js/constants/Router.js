import { loadHtml } from "../utils/loadHtml.js";

/**
 * @var ROUTES
 * @description An array holding all available application routes
 * @type {Array}
 */
export const ROUTES = [
  {
    name: "title",
    template: await loadHtml("./core/html/views/title.html"),
  },
];
