export class MainMenuController {
  /**
   * @property appInstance
   * @type {Object}
   * @description The application instance
   */
  #appInstance;

  constructor(appInstance) {
    this.#appInstance = appInstance;
  }

  /**
   * @method init
   * @description initialises event handlers for this controller
   * @returns {void}
   */
  init() {
    const mainMenuButtons = document.getElementsByClassName("test2");
    for (const item of mainMenuButtons) {
      item.addEventListener("click", () => {
        this.#appInstance.router.navigateTo("title");
      });
    }
  }
}
