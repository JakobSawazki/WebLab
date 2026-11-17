import { normalizeSolved } from "./exercises.js";

export const EXERCISE_KEY = "weblab-exercises-v1";

// Keep failed writes in this tab until they can be saved or backed up.
// Reading an unchanged store still picks up the device's latest markers.
export function createExerciseStore(getStorage) {
  let pending = null,
    protectedFromWrites = false;
  function solved() {
    if (pending !== null) return new Set(pending);
    try {
      return new Set(normalizeSolved(JSON.parse(getStorage().getItem(EXERCISE_KEY) || "[]")) || []);
    } catch {
      return new Set();
    }
  }
  function store(list) {
    // Imports replace the list; do not merge markers from the previous backup.
    pending = normalizeSolved(list) || [];
    if (protectedFromWrites) return false;
    try {
      getStorage().setItem(EXERCISE_KEY, JSON.stringify(pending));
      pending = null;
      return true;
    } catch {
      return false;
    }
  }
  return {
    solved,
    store,
    hasPending: () => pending !== null,
    retry: () => pending === null || store(pending),
    protect: (value) => { protectedFromWrites = Boolean(value); },
  };
}
