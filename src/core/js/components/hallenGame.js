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

    // update variables from scene data
    if (raw) {
      const sceneData = JSON.parse(raw);
      const s = window.hallen.state.getState();
      window.hallen.state.setState({
        ...s,
        variables: {
          ...s.variables,
          ...sceneData.variables,
        },
      });
    }
    // resolve view conditions to determine which choices to show based on state variables
    const s = window.hallen.state.getState();
    const variables = s.variables || {};
    const choices = this.querySelectorAll("#hg-choices [data-hg-condition]");
    choices.forEach((el) => {
      const cond = el.getAttribute("data-hg-condition");
      let show = true;
      if (cond) {
        if (cond.startsWith("!")) {
          // Negated condition: show if variable is NOT truthy
          show = !variables[cond.slice(1)];
        } else {
          // Positive condition: show if variable is truthy
          show = !!variables[cond];
        }
      }
      if (!show) {
        el.remove();
      }
    });

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
