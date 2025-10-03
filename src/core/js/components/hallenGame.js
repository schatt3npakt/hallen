import { loadHtml } from "../utils/loadHtml.js";

export class HallenGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    this.classList.add("loading");
    const scenePath =
      "./scenes/" + window.hallen.state.getState().currentSceneId + ".html";
    const html = await loadHtml(scenePath);
    this.innerHTML = html;

    const raw = this.querySelector("#hg-data")?.textContent;
    if (raw) {
      this.updateStateFromSceneData(JSON.parse(raw));
    }

    this.resolveChoiceConditions();
    this.preloadImages();
  }

  updateStateFromSceneData(sceneData) {
    const s = window.hallen.state.getState();
    if (sceneData.unlocks) {
      window.hallen.state.setState({
        ...s,
        unlocks: new Set([...s.unlocks, ...sceneData.unlocks]),
      });
    }
    if (sceneData.variables) {
      window.hallen.state.setState({
        ...window.hallen.state.getState(),
        variables: {
          ...s.variables,
          ...sceneData.variables,
        },
      });
    }
  }

  resolveChoiceConditions() {
    const s = window.hallen.state.getState();
    const variables = s.variables || {};
    const choices = this.querySelectorAll("#hg-choices [data-hg-condition]");
    choices.forEach((el) => {
      const cond = el.getAttribute("data-hg-condition");
      let show = true;
      if (cond) {
        show = cond.startsWith("!")
          ? !variables[cond.slice(1)]
          : !!variables[cond];
      }
      if (!show) el.remove();
    });
  }

  preloadImages() {
    const images = this.querySelectorAll("img");
    if (images.length === 0) {
      this.classList.remove("loading");
      return;
    }
    let loadedCount = 0;
    const onLoadOrError = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        this.classList.remove("loading");
      }
    };
    images.forEach((img) => {
      if (img.complete) {
        onLoadOrError();
      } else {
        img.addEventListener("load", onLoadOrError);
        img.addEventListener("error", onLoadOrError);
      }
    });
  }
}
