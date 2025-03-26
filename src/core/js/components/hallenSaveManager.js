export class HallenSaveManager extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const saves = window.hallenState.getSavestates();
    let template = `
      <ul>
        ${saves.map((save) => {
          return (
            "<li>" +
            save.value +
            "<button>Load save</button><button>Delete save</button></li>"
          );
        })} 
      </ul>
      <button>Create new save</button>
    `;

    this.innerHTML = template;
  }
}
