const questions = [
  {
    id: 1,
    text: "When did JavaScript first appear?",
    choices: ["1998", "1997", "1995", "1999"],
    answer: "1995",
    explanation: "JavaScript was created in 1995 and first shipped with Netscape Navigator.",
  },
  {
    id: 2,
    text: "Which keyword declares a block-scoped variable that can be reassigned?",
    choices: ["var", "let", "const", "static"],
    answer: "let",
    explanation: "`let` declares a variable whose scope is limited to its block.",
  },
  {
    id: 3,
    text: "What does `typeof null` return in JavaScript?",
    choices: ['"null"', '"undefined"', '"object"', '"boolean"'],
    answer: '"object"',
    explanation: "This is a longstanding JavaScript quirk: `typeof null` returns `\"object\"`.",
  },
  {
    id: 4,
    text: "Which array method adds an item to the end of an array?",
    choices: ["push()", "shift()", "unshift()", "slice()"],
    answer: "push()",
    explanation: "`push()` appends one or more items to the end of an array.",
  },
  {
    id: 5,
    text: "Which value represents an intentional absence of a value?",
    choices: ["false", "0", "null", "NaN"],
    answer: "null",
    explanation: "`null` is commonly used to represent an intentional absence of a value.",
  },
  {
    id: 6,
    text: "Which method selects the first element matching a CSS selector?",
    choices: [
      "document.getElements()",
      "document.querySelector()",
      "document.findElement()",
      "document.select()",
    ],
    answer: "document.querySelector()",
    explanation: "`document.querySelector()` returns the first matching element.",
  },
  {
    id: 7,
    text: "Which symbol is used in the syntax of an arrow function?",
    choices: ["=>", "->", "::", "**"],
    answer: "=>",
    explanation: "An arrow function uses the `=>` token between its parameters and body.",
  },
  {
    id: 8,
    text: "What does `JSON.stringify()` do?",
    choices: [
      "Parses JSON text into a value",
      "Converts a JavaScript value to a JSON string",
      "Validates a CSS selector",
      "Clones an array",
    ],
    answer: "Converts a JavaScript value to a JSON string",
    explanation: "`JSON.stringify()` serializes a JavaScript value into JSON text.",
  },
  {
    id: 9,
    text: "Which Promise method runs when the Promise is fulfilled?",
    choices: ["catch()", "finally()", "then()", "resolve()"],
    answer: "then()",
    explanation: "`then()` registers a callback that runs when a Promise is fulfilled.",
  },
  {
    id: 10,
    text: "Which method registers an event handler on an element?",
    choices: [
      "element.addEventListener()",
      "element.addEvent()",
      "element.on()",
      "element.listen()",
    ],
    answer: "element.addEventListener()",
    explanation: "`addEventListener()` attaches an event listener to an element.",
  },
];

export default questions;
