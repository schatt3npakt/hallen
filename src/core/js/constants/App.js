import { hallenVariables } from "../../../config.js";

export const initialAppState = {
  currentSceneId: null,
  unlocks: new Set(),
  variables: { ...hallenVariables },
};
