import { hallenConfig } from "../../../config.js";
import { initialAppState } from "../constants/App.js";

export class AppState {
  async init() {
    const latestSave = await window.hallen.db.getLatestSave();
    if (latestSave) {
      this.state = latestSave.value;
    } else {
      this.state = initialAppState;
      this.state.currentSceneId = hallenConfig.entryLevelId;
    }
  }
  getState() {
    return this.state;
  }
  setState(newState) {
    Object.assign(this.state, newState);
  }
  toScene(sceneId) {
    this.state.currentSceneId = sceneId;
    window.hallen.router.refresh();
  }
}
