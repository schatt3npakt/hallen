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
      "./scenes/" + window.hallen.state.getState().currentSceneId + ".html";
    const html = await loadHtml(scenePath);
    this.classList.add("loading");
    this.innerHTML = html;

    // update unlocks from scene data
    const raw = this.querySelector("#hg-data")?.textContent;
    if (raw) {
      const sceneData = JSON.parse(raw);
      const s = window.hallen.state.getState();
      window.hallen.state.setState({
        ...s,
        unlocks: new Set([...s.unlocks, ...(sceneData.unlocks || [])]),
      });
    }

    // preload images
    const images = this.querySelectorAll("img");
    if (images.length === 0) {
      this.classList.remove("loading");
    } else {
      let loadedCount = 0;
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          if (loadedCount === images.length) {
            this.classList.remove("loading");
          }
        } else {
          img.addEventListener("load", () => {
            loadedCount++;
            if (loadedCount === images.length) {
              this.classList.remove("loading");
            }
          });
          img.addEventListener("error", () => {
            loadedCount++;
            if (loadedCount === images.length) {
              this.classList.remove("loading");
            }
          });
        }
      });
    }
  }
}
