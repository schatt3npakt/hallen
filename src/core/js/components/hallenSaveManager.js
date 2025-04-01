export class HallenSaveManager extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const storeEntries = await window.hallenDb.getAll();
    let template = "";

    template +=
      '<button onclick="window.hallenDb.createNewSave()">Create new save</button>';

    template += `<h2>Saved Games</h2>`;

    if (storeEntries.length === 0) {
      template += `<p>No saved games found.</p>`;
    } else {
      template += `<ul>`;
      storeEntries.forEach((entry) => {
        template += `
          <li>
            ${this.renderSaveDate(entry.date)}
            <button onclick="window.hallenDb.loadSave('${entry.id}')">Load save</button>
            <button onclick="window.hallenDb.deleteSave('${entry.id}')">Delete save</button>
          </li>`;
      });
      template += `</ul>`;
    }

    this.innerHTML = template;
  }

  renderSaveDate(date) {
    const dateObj = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return dateObj.toLocaleString("en-US", options);
  }
}
