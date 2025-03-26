export class Db {
  #db;

  async deleteSavestate(stateIndex) {
    return new Promise((resolve, reject) => {
      const connection = window.indexedDB.open("haStorage");
      connection.onsuccess = (event) => {
        this.#db = event.target.result;

        const objectStore = this.#db
          .transaction(["savestates"], "readwrite")
          .objectStore("savestates");
        const request = objectStore.delete(stateIndex);

        request.onsuccess = () => {
          resolve();
        };
        request.onerror = () => {
          reject();
        };
      };
      connection.onerror = (error) => {
        reject(error);
      };
    });
  }
  async init() {
    return new Promise((resolve, reject) => {
      const connection = window.indexedDB.open("haStorage");
      connection.onupgradeneeded = (event) => {
        this.#db = event.target.result;
        this.#db = event.target.result;
        this.#db.createObjectStore("savestates", {
          autoIncrement: true,
        });
        resolve();
      };
      connection.onsuccess = (event) => {
        this.#db = event.target.result;
        resolve();
      };
      connection.onerror = (error) => {
        reject(error);
      };
    });
  }

  async readSavestates() {
    return new Promise((resolve, reject) => {
      const connection = window.indexedDB.open("haStorage");
      connection.onsuccess = () => {
        const objectStore = this.#db
          .transaction(["savestates"])
          .objectStore("savestates");
        objectStore.getAll().onsuccess = (event) => {
          resolve(event.target.result);
        };
      };
      connection.onerror = (error) => {
        reject(error);
      };
    });
  }
  async readSavestate(stateIndex) {
    return new Promise((resolve, reject) => {
      const connection = window.indexedDB.open("haStorage");
      connection.onsuccess = (event) => {
        this.#db = event.target.result;

        const objectStore = this.#db
          .transaction(["savestates"])
          .objectStore("savestates");
        const request = objectStore.get(stateIndex);

        request.onsuccess = () => {
          return resolve(request.result);
        };
        request.onerror = (error) => {
          return reject(error);
        };
      };
    });
  }
  async updateSavestate(stateIndex, payload) {
    return new Promise((resolve, reject) => {
      const connection = window.indexedDB.open("haStorage");
      connection.onsuccess = (event) => {
        this.#db = event.target.result;

        const objectStore = this.#db
          .transaction(["savestates"], "readwrite")
          .objectStore("savestates");
        const request = objectStore.get(stateIndex);

        request.onsuccess = () => {
          const data = event.target.result;
          data.value = payload;

          const requestUpdate = objectStore.put(data);
          requestUpdate.onsuccess = () => {
            resolve();
          };
        };
        request.onerror = (error) => {
          reject(error);
        };
      };
    });
  }
  async writeSavestate() {
    return new Promise((resolve, reject) => {
      const connection = window.indexedDB.open("haStorage");
      connection.onsuccess = (event) => {
        this.#db = event.target.result;

        const objectStore = this.#db
          .transaction(["savestates"], "readwrite")
          .objectStore("savestates");
        const request = objectStore.add({
          vale: "test",
        });

        request.onsuccess = () => {
          resolve();
        };

        request.onerror = (error) => {
          reject(error);
        };
      };
    });
  }
}
