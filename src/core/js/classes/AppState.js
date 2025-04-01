import { hallenConfig } from "../../../config.js";
import { initialAppState } from "../constants/App.js";

export class AppState {
  init() {
    // TODO: load from local storage
    this.state = initialAppState;
    this.state.currentLevelId = hallenConfig.entryLevelId;
  }

  getState() {
    return this.state;
  }

  setCurrentLevelId(levelId) {
    this.state.currentLevelId = levelId;
    window.hallenRouter.refresh();
  }
}
