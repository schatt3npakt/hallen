export class Db {
  #db;

  deleteSavestate(stateIndex) {
    const connection = window.indexedDB.open("haStorage");
    connection.onsuccess = (event) => {
      this.#db = event.target.result;

      const objectStore = this.#db
        .transaction(["savestates"], "readwrite")
        .objectStore("savestates");
      const request = objectStore.delete(stateIndex);

      request.onsuccess = () => {};
    };
  }
  init() {
    const connection = window.indexedDB.open("haStorage");
    connection.onerror = (event) => {
      throw new Error(
        "Db: There was an error while starting the db: " +
          event.target?.error.message
      );
    };
    connection.onupgradeneeded = (event) => {
      this.#db = event.target.result;
      this.#db = event.target.result;
      this.#db.createObjectStore("savestates", {
        autoIncrement: true,
      });
    };
    connection.onsuccess = (event) => {
      this.#db = event.target.result;
    };
  }

  readSavestates() {
    const connection = window.indexedDB.open("haStorage");
    connection.onsuccess = () => {
      const objectStore = this.#db
        .transaction(["savestates"])
        .objectStore("savestates");
      objectStore.getAll().onsuccess = (event) => {
        return event.target.result;
      };
    };
  }
  readSavestate(stateIndex) {
    const connection = window.indexedDB.open("haStorage");
    connection.onsuccess = (event) => {
      this.#db = event.target.result;

      const objectStore = this.#db
        .transaction(["savestates"])
        .objectStore("savestates");
      const request = objectStore.get(stateIndex);

      request.onsuccess = () => {
        return request.result;
      };
    };
  }
  updateSavestate(stateIndex, payload) {
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
        requestUpdate.onsuccess = () => {};
      };
    };
  }
  writeSavestate() {
    const connection = window.indexedDB.open("haStorage");
    connection.onsuccess = (event) => {
      this.#db = event.target.result;

      const objectStore = this.#db
        .transaction(["savestates"], "readwrite")
        .objectStore("savestates");
      const request = objectStore.add({
        vale: "test",
      });

      request.onsuccess = () => {};
    };
  }
}
