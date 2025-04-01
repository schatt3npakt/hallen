export class HallenSaveManager extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const storeEntries = await window.hallenDb.getAll();
    let template = `<h2>Saved Games</h2>`;

    if (storeEntries.length === 0) {
      template += `<p>No saved games found.</p>`;
    } else {
      template += `<ul>`;
      storeEntries.forEach((entry) => {
        template += `
          <li>
            ${entry.date}
            <button onclick="window.hallenDb.loadSave('${entry.id}')">Load save</button>
            <button onclick="window.hallenDb.deleteSave('${entry.id}')">Delete save</button>
          </li>`;
      });
      template += `</ul>`;
    }

    template +=
      '<button onclick="window.hallenDb.createNewSave()">Save Game</button>';

    this.innerHTML = template;
  }
}
