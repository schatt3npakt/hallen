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
    const titleButton = document.getElementById("test");
    titleButton.addEventListener("click", () => {
      this.#appInstance.router.navigateTo("mainmenu");
    });
  }
}
