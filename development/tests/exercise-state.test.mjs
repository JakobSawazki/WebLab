import test from "node:test";
import assert from "node:assert/strict";
import { createExerciseStore, EXERCISE_KEY } from "../src/exercise-state.js";

function fixture(initial = ["l1-2"]) {
  let raw = JSON.stringify(initial), fail = false;
  const storage = {
    getItem: (key) => key === EXERCISE_KEY ? raw : null,
    setItem: (key, value) => {
      assert.equal(key, EXERCISE_KEY);
      if (fail) throw new Error("Storage unavailable");
      raw = value;
    },
  };
  return {
    store: createExerciseStore(() => storage),
    fail: (value) => { fail = value; },
    persisted: () => JSON.parse(raw),
    external: (list) => { raw = JSON.stringify(list); },
  };
}

test("A failed exercise save retains old and newly solved markers for navigation and backup", () => {
  const f = fixture();
  f.fail(true);
  const solved = f.store.solved();
  solved.add("l1-1");
  assert.equal(f.store.store([...solved]), false);
  assert.deepEqual(f.persisted(), ["l1-2"]);
  assert.deepEqual([...f.store.solved()], ["l1-2", "l1-1"]);
  f.store.solved().clear(); // Consumers cannot mutate the in-memory backup.
  assert.equal(f.store.hasPending(), true);
  assert.deepEqual([...f.store.solved()], ["l1-2", "l1-1"]);
  f.fail(false);
  assert.equal(f.store.retry(), true);
  assert.equal(f.store.hasPending(), false);
  assert.deepEqual(f.persisted(), ["l1-2", "l1-1"]);
});

test("An imported marker list replaces pending work and retries without merging another backup", () => {
  const f = fixture();
  f.fail(true);
  f.store.store(["l1-1", "l1-2"]);
  f.store.store(["l2-1", "unknown", "l2-1", 123]);
  assert.deepEqual([...f.store.solved()], ["l2-1"]);
  assert.deepEqual(f.persisted(), ["l1-2"]);
  f.fail(false);
  f.store.retry();
  assert.deepEqual(f.persisted(), ["l2-1"]);
  f.fail(true);
  assert.equal(f.store.store([]), false);
  assert.deepEqual([...f.store.solved()], []);
  assert.equal(f.store.hasPending(), true); // Clearing also needs persistence.
});

test("Protected exercise writes retain this tab's work without overwriting an external change", () => {
  const f = fixture();
  f.fail(true);
  f.store.store(["l1-1", "l1-2"]);
  f.fail(false);
  f.external(["l3-1"]);
  f.store.protect(true);
  assert.equal(f.store.retry(), false);
  assert.equal(f.store.store([...f.store.solved(), "l2-1"]), false);
  assert.deepEqual(f.persisted(), ["l3-1"]);
  assert.deepEqual([...f.store.solved()], ["l1-1", "l1-2", "l2-1"]);
  f.store.protect(false); // An explicit successful main-state import can release protection.
  assert.equal(f.store.store(["l4-1"]), true);
  assert.deepEqual(f.persisted(), ["l4-1"]);
  f.external(["l5-1"]);
  assert.deepEqual([...f.store.solved()], ["l5-1"]);
});

test("Blocked access to localStorage still permits an in-memory JSON backup and later retry", () => {
  let unavailable = true, raw = null;
  const store = createExerciseStore(() => {
    if (unavailable) throw new Error("Storage access blocked");
    return { getItem: () => raw, setItem: (_, value) => { raw = value; } };
  });
  assert.deepEqual([...store.solved()], []);
  assert.equal(store.store(["l1-1"]), false);
  assert.deepEqual([...store.solved()], ["l1-1"]);
  unavailable = false;
  assert.equal(store.retry(), true);
  assert.deepEqual(JSON.parse(raw), ["l1-1"]);
});
