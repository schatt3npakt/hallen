import { hallenUnlocks } from "../../../config.js";

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
            ${this.renderUnlocksPercentage(entry.value.unlocks)}
            ${this.renderSaveDate(entry.date)}
            <div>
              <button class="hg-button"  onclick="window.hallen.db.loadSave('${entry.id}')">Load</button>
              <button class="hg-button"  onclick="window.hallen.db.deleteSave('${entry.id}')">Delete</button>
            </div>
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

  renderUnlocksPercentage(unlocks) {
    const totalUnlocks = Object.keys(hallenUnlocks).length;
    const unlockedCount = unlocks.size;
    const percentage = ((unlockedCount / totalUnlocks) * 100).toFixed(2);
    return `<p><strong>${unlockedCount} / ${totalUnlocks}</strong> unlocks (${percentage}%)</p>`;
  }
}
