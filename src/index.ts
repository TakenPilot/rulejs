'use strict';

type Rule = {
  when: boolean | Function | RegExp;
  then: any | Function;
};

const isRegExp = (x: any): boolean => typeof x === 'object' && !!x[Symbol.match];

function checkWhen(rule: Rule, args: any[]): boolean {
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

function returnThen(rule: Rule, args: any[]): any {
  const then = rule.then;

  switch (typeof then) {
    case 'function': return then.apply(null, args);
    default: return then;
  }
}

export function select(ruleSet: Rule[], ...args: any[]): Rule[] {
  const selected: Rule[] = [];

  for (let i = 0; i < ruleSet.length; i++) {
    const rule = ruleSet[i];

    if (checkWhen(rule, args)) {
      selected.push(rule);
    }
  }

  return selected;
}

export function first(ruleSet: Rule[], ...args: any[]): any {
  for (let i = 0; i < ruleSet.length; i++) {
    const rule = ruleSet[i];

    if (checkWhen(rule, args)) {
      return returnThen(rule, args);
    }
  }
}

export function all(ruleSet: Rule[], ...args: any[]): any[] {
  let result: any[] = [];

  for (let i = 0; i < ruleSet.length; i++) {
    const rule = ruleSet[i];

    if (checkWhen(rule, args)) {
      result.push(returnThen(rule, args));
    }
  }

  return result;
}
