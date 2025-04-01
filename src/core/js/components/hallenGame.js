import { loadHtml } from "../utils/loadHtml.js";

export class HallenGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }
  render() {
    const scenePath =
      "./scenes/" + window.hallenState.getState().currentSceneId + ".html";
    loadHtml(scenePath).then((html) => {
      this.innerHTML = html;
    });
  }
}
