'use strict';

const toArgs = x => Array.prototype.slice.call(x);
const isRegExp = x => typeof x === 'object' && !!x[Symbol.match];

/**
 * @param {object} rule
 * @param {Array} args
 * @returns {boolean}
 */
function checkWhen(rule, args) {
  const when = rule.when;

  switch (typeof when) {
    case 'function': return !!when.apply(null, args);
    case 'boolean': return when;
    case 'object':
      if (isRegExp(when)) {
        return when.test(args[0]);
      }
      return true;
    default: return args[0] === when;
  }
}

/**
 * @param {object} rule
 * @param {Array} args
 * @returns {*}
 */
function returnThen(rule, args) {
  const then = rule.then;

  switch (typeof then) {
    case 'function': return then.apply(null, args);
    default: return then;
  }
}

/**
 * Select rules whose `when` returns truthy
 * @param {[{when: function, then: function}]} ruleSet
 * @returns {[{when: function, then: function}]}  new RuleSet
 */
function select(ruleSet) {
  const selected = [];

  for (let i = 0; i < ruleSet.length; i++) {
    const rule = ruleSet[i],
      args = toArgs(arguments);

    if (checkWhen(rule, args)) {
      selected.push(rule);
    }
  }

  return selected;
}

/**
 * Execute the `then` of the first rule whose `when` returns truthy
 * @param {[{when: function, then: function}]} ruleSet
 * @returns {*}  Result of first good rule
 */
function first(ruleSet) {
  for (let i = 0; i < ruleSet.length; i++) {
    const rule = ruleSet[i],
      args = toArgs(arguments);

    if (checkWhen(rule, args)) {
      return returnThen(rule, args);
    }
  }
}

/**
 * Return the results of all that pass
 * @param {Array} ruleSet
 * @returns {Array}
 */
function all(ruleSet) {
  let result = [];

  for (let i = 0; i < ruleSet.length; i++) {
    const rule = ruleSet[i],
      args = toArgs(arguments);

    if (checkWhen(rule, args)) {
      result.push(returnThen(rule, args));
    }
  }

  return result;
}

module.exports.select = select;
module.exports.first = first;
module.exports.all = all;
