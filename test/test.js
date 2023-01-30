'use strict';

const assert = require('node:assert').strict;
const lib = require('../');
const constant = x => () => x;

describe('select', function () {
  const fn = lib[this.title];

  it('returns', function () {
    const ruleSet = [{ when: constant(true), then: constant('a') }];

    assert.deepEqual(fn(ruleSet), ruleSet);
  });

  it('does not return false rules', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      secondRule = { when: constant(true), then: constant('b') },
      ruleSet = [firstRule, secondRule];

    assert.deepEqual(fn(ruleSet), [secondRule]);
  });

  it('returns empty array if none pass', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      ruleSet = [firstRule];

    assert.deepEqual(fn(ruleSet), []);
  });

  it('returns when true', function () {
    const ruleSet = [{ when: true, then: constant('a') }];

    assert.deepEqual(fn(ruleSet), ruleSet);
  });
});

describe('first', function () {
  const fn = lib[this.title];

  it('returns', function () {
    const ruleSet = [{ when: constant(true), then: constant('a') }];

    assert.equal(fn(ruleSet), 'a');
  });

  it('skips false rules', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      secondRule = { when: constant(true), then: constant('b') },
      ruleSet = [firstRule, secondRule];

    assert.equal(fn(ruleSet), 'b');
  });

  it('takes regex', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      secondRule = { when: /b/, then: constant('c') },
      ruleSet = [firstRule, secondRule];

    assert.equal(fn(ruleSet, 'b'), 'c');
  });

  it('returns first passing', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      secondRule = { when: constant(true), then: constant('b') },
      thirdRule = { when: constant(true), then: constant('c') },
      ruleSet = [firstRule, secondRule, thirdRule];

    assert.equal(fn(ruleSet), 'b');
  });

  it('returns undefined if none pass', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      ruleSet = [firstRule];

    assert.equal(fn(ruleSet), undefined);
  });
});

describe('all', function () {
  const fn = lib[this.title];

  it('returns', function () {
    const ruleSet = [{ when: constant(true), then: constant('a') }];

    assert.deepEqual(fn(ruleSet), ['a']);
  });

  it('skips false rules', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      secondRule = { when: constant(true), then: constant('b') },
      ruleSet = [firstRule, secondRule];

    assert.deepEqual(fn(ruleSet), ['b']);
  });

  it('returns all passing', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      secondRule = { when: constant(true), then: constant('b') },
      thirdRule = { when: constant(true), then: constant('c') },
      ruleSet = [firstRule, secondRule, thirdRule];

    assert.deepEqual(fn(ruleSet), ['b', 'c']);
  });

  it('returns empty array if none pass', function () {
    const firstRule = { when: constant(false), then: constant('a') },
      ruleSet = [firstRule];

    assert.deepEqual(fn(ruleSet), []);
  });
});

