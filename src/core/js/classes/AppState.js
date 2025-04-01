import { hallenConfig } from "../../../config.js";
import { initialAppState } from "../constants/App.js";

export class AppState {
  init() {
    // TODO: load from local storage
    this.state = initialAppState;
    this.state.currentSceneId = hallenConfig.entryLevelId;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    Object.assign(this.state, newState);
  }

  toScene(sceneId) {
    this.state.currentSceneId = sceneId;
    window.hallenRouter.refresh();
  }
}
