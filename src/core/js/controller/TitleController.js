export class TitleController {
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
    const titleButtons = document.getElementsByClassName("test");
    for (const item of titleButtons) {
      item.addEventListener("click", () => {
        this.#appInstance.router.navigateTo("dömdöm");
      });
    }
  }
}
