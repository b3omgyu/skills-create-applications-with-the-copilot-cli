#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *  - addition: + or add
 *  - subtraction: - or sub
 *  - multiplication: * or x or mul
 *  - division: / or div (handles division-by-zero error)
 *
 * Usage examples:
 *  node src/calculator.js add 2 3
 *  node src/calculator.js + 2 3
 *  node src/calculator.js "2 + 3"
 *  node src/calculator.js 5 / 0   (will return an error for division by zero)
 */

const args = process.argv.slice(2);

function showHelp() {
  console.log('Usage: calculator <op> <a> <b>');
  console.log('Supported ops: add (+), sub (-), mul (*), div (/)');
  console.log('Examples:');
  console.log('  node src/calculator.js add 2 3');
  console.log('  node src/calculator.js + 2 3');
  console.log('  node src/calculator.js "2 + 3"');
}

function parseNumber(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function compute(op, a, b) {
  switch (op) {
    case '+':
    case 'add':
      return a + b;
    case '-':
    case 'sub':
      return a - b;
    case '*':
    case 'x':
    case 'mul':
      return a * b;
    case '/':
    case 'div':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error('Unsupported operation: ' + op);
  }
}

if (args.length === 0) {
  showHelp();
  process.exit(0);
}

// If single argument, try to parse expression like "2 + 3"
if (args.length === 1) {
  const expr = args[0].trim();
  // match: number, optional spaces, operator, optional spaces, number
  const m = expr.match(/^([-+]?[0-9]*\.?[0-9]+)\s*([+\-*/x])\s*([-+]?[0-9]*\.?[0-9]+)$/i);
  if (m) {
    const a = parseNumber(m[1]);
    const opSym = m[2];
    const b = parseNumber(m[3]);
    if (a === null || b === null) {
      console.error('Invalid numbers in expression');
      process.exit(1);
    }
    const opMap = { 'x': '*', 'X': '*'};
    const op = opMap[opSym] || opSym;
    try {
      const res = compute(op, a, b);
      console.log(res);
      process.exit(0);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  } else {
    console.error('Unable to parse expression. Provide: <a> <op> <b> or use three args.');
    showHelp();
    process.exit(1);
  }
}

// If three args, interpret as: op a b OR a op b depending on position
if (args.length === 3) {
  let [p0, p1, p2] = args;
  // If first is operator
  let op, aStr, bStr;
  if (/^[+\-*/x]|^(add|sub|mul|div)$/i.test(p0)) {
    op = p0.toLowerCase();
    aStr = p1;
    bStr = p2;
  } else if (/^[+\-*/x]|^(add|sub|mul|div)$/i.test(p1)) {
    // allow: a op b
    op = p1.toLowerCase();
    aStr = p0;
    bStr = p2;
  } else {
    console.error('Operator not recognized.');
    showHelp();
    process.exit(1);
  }

  const a = parseNumber(aStr);
  const b = parseNumber(bStr);
  if (a === null || b === null) {
    console.error('Invalid numeric arguments');
    process.exit(1);
  }
  // normalize operator
  if (op === 'x') op = '*';
  try {
    const res = compute(op, a, b);
    console.log(res);
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

// Anything else: show help
showHelp();
process.exit(0);
