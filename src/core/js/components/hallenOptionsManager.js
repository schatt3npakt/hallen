export class HallenOptionsManager extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.renderFullScreenButton();
  }

  renderFullScreenButton() {
    const button = document.createElement("button");
    button.className = "hg-button";
    button.textContent = "Toggle Full Screen";
    button.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
    this.appendChild(button);
  }
}
