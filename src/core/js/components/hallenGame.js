import { loadHtml } from "../utils/loadHtml.js";

export class HallenGame extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const sceneHtml = await loadHtml("./scenes/1.html");
    this.innerHTML = sceneHtml;
  }
}
