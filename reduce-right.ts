type Arg = number;

type Callback = (callback: Callback, ...args: Arg[]) => void;

const waterfall =
  (...functions: Callback[]) =>
  (callback: Callback, ...args: Arg[]) =>
    functions.reduceRight(
      (composition, fn) =>
        (...results) =>
          fn(composition, ...results),
      callback
    )(...args);

const randInt = (max: number) => Math.floor(Math.random() * max);

const add5: Callback = (callback, x) => {
  setTimeout(callback, randInt(1000), x + 5);
};
const mult3: Callback = (callback, x) => {
  setTimeout(callback, randInt(1000), x * 3);
};
const sub2: Callback = (callback, x) => {
  setTimeout(callback, randInt(1000), x - 2);
};
const split: Callback = (callback, x) => {
  setTimeout(callback, randInt(1000), x, x);
};
const add: Callback = (callback, x, y) => {
  setTimeout(callback, randInt(1000), x + y);
};
const div4: Callback = (callback, x) => {
  setTimeout(callback, randInt(1000), x / 4);
};

const computation = waterfall(add5, mult3, sub2, split, add, div4);
computation(console.log, 5); // Logs 14

// same as:

const computation2 = (input, callback) => {
  const f6 = (x: Arg) => div4(callback, x);
  const f5 = (x: Arg, y: Arg) => add(f6, x, y);
  const f4 = (x: Arg) => split(f5, x);
  const f3 = (x: Arg) => sub2(f4, x);
  const f2 = (x: Arg) => mult3(f3, x);
  add5(f2, input);
};
