//对算数表达式求值,包含加减乘除、小括号、只考虑正整数；Example: ` 1+2*3` 输出：7
function executeStr(s) {
  s = s.replace(/\s+/g, ""); // 去除空格
  function calc(expr) {
    let stack = [];
    let num = 0;
    let preSign = "+";
    for (let i = 0; i < expr.length; i++) {
      let ch = expr[i];
      if (/\d/.test(ch)) {
        num = num * 10 + parseInt(ch);
      }
      if (ch === "(") {
        // 找到对应的右括号
        let j = i,
          cnt = 0;
        for (; i < expr.length; i++) {
          if (expr[i] === "(") cnt++;
          if (expr[i] === ")") cnt--;
          if (cnt === 0) break;
        }
        num = calc(expr.slice(j + 1, i));
      }
      if (mathType.includes(ch) || i === expr.length - 1) {
        if (preSign === "+") stack.push(num);
        if (preSign === "-") stack.push(-num);
        if (preSign === "*") stack.push(stack.pop() * num);
        if (preSign === "/") stack.push(Math.trunc(stack.pop() / num));
        preSign = ch;
        num = 0;
      }
    }
    return stack.reduce((a, b) => a + b, 0);
  }
  const mathType = ["+", "-", "*", "/"];
  return calc(s);
}
const str = " 3/2 ",
  str2 = " 3+5 / 2*3+(1+1) ";
console.log(executeStr(str2));
