"use strict";

import { select, first, all } from "./index";

/**
 * Returns a function that always returns the provided value.
 * @param {string | boolean} x - The value to return.
 * @returns {Function} A function that returns the value `x`.
 */
const constant = (x: string | boolean): Function => () => x;

describe("select", function () {
  it("returns", function () {
    const ruleSet = [{ when: constant(true), then: constant("a") }];

    expect(select(ruleSet)).toEqual(ruleSet);
  });

  it("does not return false rules", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      secondRule = { when: constant(true), then: constant("b") },
      ruleSet = [firstRule, secondRule];

    expect(select(ruleSet)).toEqual([secondRule]);
  });

  it("returns empty array if none pass", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      ruleSet = [firstRule];

    expect(select(ruleSet)).toEqual([]);
  });

  it("returns when true", function () {
    const ruleSet = [{ when: true, then: constant("a") }];

    expect(select(ruleSet)).toEqual(ruleSet);
  });
});

describe("first", function () {
  it("returns", function () {
    const ruleSet = [{ when: constant(true), then: constant("a") }];

    expect(first(ruleSet)).toBe("a");
  });

  it("skips false rules", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      secondRule = { when: constant(true), then: constant("b") },
      ruleSet = [firstRule, secondRule];

    expect(first(ruleSet)).toBe("b");
  });

  it("takes regex", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      secondRule = { when: /b/, then: constant("c") },
      ruleSet = [firstRule, secondRule];

    expect(first(ruleSet, "b")).toBe("c");
  });

  it("returns first passing", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      secondRule = { when: constant(true), then: constant("b") },
      thirdRule = { when: constant(true), then: constant("c") },
      ruleSet = [firstRule, secondRule, thirdRule];

    expect(first(ruleSet)).toBe("b");
  });

  it("returns undefined if none pass", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      ruleSet = [firstRule];

    expect(first(ruleSet)).toBeUndefined();
  });
});

describe("all", function () {
  it("returns", function () {
    const ruleSet = [{ when: constant(true), then: constant("a") }];

    expect(all(ruleSet)).toEqual(["a"]);
  });

  it("skips false rules", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      secondRule = { when: constant(true), then: constant("b") },
      ruleSet = [firstRule, secondRule];

    expect(all(ruleSet)).toEqual(["b"]);
  });

  it("returns all passing", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      secondRule = { when: constant(true), then: constant("b") },
      thirdRule = { when: constant(true), then: constant("c") },
      ruleSet = [firstRule, secondRule, thirdRule];

    expect(all(ruleSet)).toEqual(["b", "c"]);
  });

  it("returns empty array if none pass", function () {
    const firstRule = { when: constant(false), then: constant("a") },
      ruleSet = [firstRule];

    expect(all(ruleSet)).toEqual([]);
  });
});
