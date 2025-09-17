import { loadHtml } from "../utils/loadHtml.js";

export class HallenGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    const scenePath =
      "./scenes/" + window.hallenState.getState().currentSceneId + ".html";
    const html = await loadHtml(scenePath);
    this.innerHTML = "<div class='hg-loader'>Loading...</div>";

    // preload images
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const imgElements = tempDiv.querySelectorAll("img");
    const imgPromises = Array.from(imgElements).map((img) => {
      return new Promise((resolve) => {
        const image = new window.Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = img.src;
      });
    });

    await Promise.all(imgPromises);
    this.innerHTML = html;
  }
}
