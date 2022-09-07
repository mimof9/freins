/* eslint-disable */
const DoubleQuotesCharCode = 34;
const code = [
  "const DoubleQuotesCharCode = 34;",
  "const code = [",
  "",
  "];",
  "for (let i = 0; i < 2; i++) console.log(code[i]);",
  "for (let i = 0; i < code.length; i++) console.log(code[2] + '  ' + String.fromCharCode(DoubleQuotesCharCode) + code[i] + String.fromCharCode(DoubleQuotesCharCode) + ',');",
  "for (let i = 3; i < code.length; i++) console.log(code[i]);",
];
for (let i = 0; i < 2; i++) console.log(code[i]);
for (let i = 0; i < code.length; i++) console.log(code[2] + '  ' + String.fromCharCode(DoubleQuotesCharCode) + code[i] + String.fromCharCode(DoubleQuotesCharCode) + ',');
for (let i = 3; i < code.length; i++) console.log(code[i]);
