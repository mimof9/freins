<script setup lang="ts">
/* eslint-disable */
  console.log('\n\nmultiline Quine:\n')
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
  
  
  console.log('\n\noneline Quine: relay string api \n')
  let output = "let output = %22__SELF__%22; output = decodeURI(output).replace('__SELF__', output); console.log(output);"; output = decodeURI(output).replace('__SELF__', output); console.log(output);
  
  
  // cheating
  console.log('\n\ncheating way: relay toString()\n');
  (function iife(){ console.log("(" + iife.toString() + ")();"); })();
  
  
  // cheating
  console.log('\n\ncheating way: relay host environmen（browser）\n');
  // (function _(){return'('+_+')();'})();
  console.log("(function _(){return'('+_+')();'})();");
  </script>
  
  <template>
    <div>
      <div>There is a Quine,</div>
      <div>You can check the Console Panel to see it!</div>
      <div>And some cheating way:</div>
      <div>Relay toString()、eval() or host environment...</div>
    </div>
  </template>
  
  <style scoped></style>
  