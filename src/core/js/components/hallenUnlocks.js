import { hallenUnlocks } from "../../../config.js";

export class HallenUnlocks extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const unlocks = window.hallen.state.getState().unlocks;
    let template = "";

    template += `<ul>`;
    for (const [key, value] of Object.entries(hallenUnlocks)) {
      if (!unlocks.has(key)) {
        template += `<li>
          <h2>?????</h2>
          <p>???????</p>
        </li>`;
      } else {
        template += `<li>
          <h2>${value.name}</h2>
          <p>${value.description}</p>
        </li>`;
      }
    }
    template += `</ul>`;
    this.innerHTML = template;
  }
}
