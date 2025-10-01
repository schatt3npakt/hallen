export class HallenSaveManager extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const storeEntries = await window.hallen.db.getAll();
    let template = "";

    template += `<h2>Saved Games</h2>`;

    if (storeEntries.length === 0) {
      template += `<p>No saved games found.</p>`;
    } else {
      template += `<ul>`;
      storeEntries.forEach((entry) => {
        template += `
          <li>
            ${this.renderSaveDate(entry.date)}
            <button class="hg-button"  onclick="window.hallen.db.loadSave('${entry.id}')">Load</button>
            <button class="hg-button"  onclick="window.hallen.db.deleteSave('${entry.id}')">Delete</button>
          </li>`;
      });
      template += `</ul>`;
    }

    template +=
      '<button class="hg-button" onclick="window.hallen.db.createNewSave()">Create new save</button>';

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
