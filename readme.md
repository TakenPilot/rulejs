# Rule.js

Rule.js is a lightweight and simple rule engine for JavaScript applications. It provides an intuitive way to process sets of rules without any external dependencies, making it ideal for a wide range of applications, from simple conditional logic to complex decision-making processes.

## Features

- **No External Dependencies**: Designed to be lightweight and standalone.
- **Easy to Use**: Simple API for various rule processing scenarios.
- **Flexible**: Supports constants, functions, and multiple parameters in rules.

## Installation

Install Rule.js using npm:

```bash
npm install rulejs
```

Or using yarn:

```bash
yarn add rulejs
```

## API

### `rules.first(ruleSet, ...args)`

Runs the first rule where `when` returns a truthy value.

### `rules.select(ruleSet, ...args)`

Returns all rule objects where `when` returns a truthy value.

### `rules.all(ruleSet, ...args)`

Returns all results where `when` returns a truthy value.

## Examples

### Constants:

```js
const { rules } = require("rulejs");

const ruleSet = [
  { when: "a", then: "b" },
  { when: 1, then: 2 },
];

rules.first(ruleSet, 1); // returns 2
rules.first(ruleSet, "a"); // returns 'b'
rules.first(ruleSet, "?"); // returns undefined
```

### Functions:

```js
const ruleSet = [
  { when: (str) => str.length > 3, then: (str) => str.substr(3).trim() },
  { when: true, then: (str) => str.toLowerCase() },
];

rules.first(ruleSet, ">>> value"); // returns 'value';
rules.first(ruleSet, "B"); // returns 'b';
```

### Multiple Facts / Parameters:

```js
const ruleSet = [
  {
    when: (platform, cmd) => platform === "win32" && cmd === "python",
    then: (platform, cmd) => cmd + ".exe",
  },
  {
    when: (platform, cmd) => platform === "win32" && cmd === "ls",
    then: () => "dir",
  },
];

rules.first(ruleSet, "win32", "python"); // returns 'python.exe';
rules.first(ruleSet, "win32", "ls"); // returns 'dir';
```

### Select All That Apply:

```js
const ruleSet = [
  { when: (str) => str.startsWith("fizz"), a: "b", c: "d" },
  { when: (str) => str.endsWith("buzz"), value: 7 },
  { when: (str) => str === "fizzbuzz", width: 8, height: 9 },
];

rules.select(ruleSet, "fizz"); // returns first item;
rules.select(ruleSet, "buzz"); // returns second item;
rules.select(ruleSet, "fizzbuzz"); // returns all three;
```

### Get All Truthy Rule Results:

```js
const ruleSet = [
  { when: (facts) => facts.isLoggedIn, then: (facts) => fetch("http://example.com/user/" + facts.userId) },
  { when: (facts) => facts.isAdmin, then: (facts) => fetch("http://example.com/rights/" + facts.rightsId) },
  { when: (facts) => facts.browser === "IE", then: (facts) => fetch("http://iesupport.com") },
];

const promises = rules.all(ruleSet, { isLoggedIn: true, browser: "IE" });

Promise.all(promises).then(/* handle resolved promises */);
```

## Contributing

Contributions to Rule.js are welcome!

<!-- Please read our [contributing guidelines](CONTRIBUTING.md) for details. -->

## License

Rule.js is [MIT licensed](LICENSE).
