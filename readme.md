Rule.js
--------

Simple rule engine pattern. No dependencies.

## API

### rules.first(ruleSet, ...args)

Runs first rule where `when` returns a truthy value

### rules.select(ruleSet, ...args)

Returns all rule objects where `when` returns a truthy value

### rules.all(ruleSet, ...args)

Returns all results where `when` returns a truthy value

## Examples

Constants:
```js
const ruleSet = [
  { when: 'a', then: 'b' },
  { when: 1, then: 2 }
]

rules.first(ruleSet, 1); // returns 2
rules.first(ruleSet, 'a'); // returns 'b'
rules.first(ruleSet, '?'); // returns undefined
```

Functions:
```js
const ruleSet = [
  { when: str => str.length > 3, then: str => str.substr(3).trim() },
  { when: true, then: str => str.toLowerCase() }
]

rules.first(ruleSet, '>>> value'); // returns 'value';
rules.first(ruleSet, 'B'); // returns 'b';
```

Multiple facts / parameters:
```js
const ruleSet = [
  {
    when: function (platform, cmd) {
      return platform === 'win32' && cmd === 'python';
    },
    then: function (platform, cmd) {
      return cmd += '.exe'
    }
  },
  {
    when: function (platform, ) {
      return platform === 'win32' && cmd === 'ls';
    },
    then: function (platform, cmd) {
      return 'dir';
    }
  }
]

rules.first(ruleSet, 'win32', 'python'); // returns 'python.exe';
rules.first(ruleSet, 'win32', 'ls'); // returns 'dir';
```

Select all that apply:
```js
const ruleSet = [
  { when: str => str.startsWith('fizz'), a: 'b', c: 'd' },
  { when: str => str.endsWith('buzz'), value: 7 },
  { when: str => str === 'fizzbuzz', width: 8, height: 9 }
]

rules.select(ruleSet, 'fizz'); // returns first item;
rules.select(ruleSet, 'buzz'); // returns second item;
rules.select(ruleSet, 'fizzbuzz'); // returns all three;
```

Get all the rule results that are truthy for `when`:

```js
const ruleSet = [
  { when: facts => facts.isLoggedIn, then: facts => fetch('http://example.com/user/' + facts.userId) },
  { when: facts => facts.isAdmin, then: facts => fetch('http://example.com/rights/' + facts.rightsId) },
  { when: facts => facts.browser === 'IE', then: facts => fetch('http://iesupport.com') }
]

const promises = rules.all(ruleSet, {isLoggedIn: true, browser: 'IE'});

return Promises.all(promises); // resolves all the API calls.
```
