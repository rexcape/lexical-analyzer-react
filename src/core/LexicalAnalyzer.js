import "./keywords";
import { KEYWORDS } from "./keywords";
import FakeAutomata from "./sb";

function isKeyword(string) {
  if (KEYWORDS.indexOf(string) !== -1) return true;
  else return false;
}

function isIdentifier(string) {
  let statusTable = [
    [0, 0, 0],
    [0, 2, 0],
    [0, 2, 2],
  ];
  let finalStatus = [2];
  let transitions = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_",
    "0123456789",
  ];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isArithmeticOperator(string) {
  let statusTable = [
    [0, 0, 0, 0],
    [0, 2, 3, 4],
    [0, 5, 0, 0],
    [0, 0, 6, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  let finalStatus = [2, 3, 4, 5, 6];
  let transitions = [["+"], ["-"], ["*", "/", "%", "="]];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isLogicalOperator(string) {
  let statusTable = [
    [0, 0, 0],
    [0, 2, 3],
    [0, 0, 4],
    [0, 0, 4],
    [0, 0, 0],
  ];
  let finalStatus = [2, 4];
  let transitions = [["!", ">", "<"], ["="]];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isOperator(string) {
  return isArithmeticOperator(string) || isLogicalOperator(string);
}

function isUnsigned(string) {
  let statusTable = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 2, 3, 5, 0],
    [0, 4, 0, 0, 0],
    [0, 4, 0, 5, 0],
    [0, 7, 0, 0, 6],
    [0, 7, 0, 0, 0],
    [0, 7, 0, 0, 0],
  ];
  let finalStatus = [2, 4, 7];
  let transitions = ["0123456789", ".", "Ee", "+-"];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isIntenger(string) {
  let statusTable = [
    [0, 0, 0, 0, 0, 0],
    [0, 3, 2, 0, 0, 0],
    [0, 2, 2, 0, 0, 0],
    [0, 0, 0, 4, 5, 0],
    [0, 0, 6, 0, 0, 6],
    [0, 5, 0, 0, 5, 0],
    [0, 6, 6, 0, 0, 6],
  ];
  let finalStatus = [2, 3, 5, 6];
  let transitions = ["0", "123456789", "x", "1234567", "abcdefABCDEF"];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function isConstant(string) {
  return isUnsigned(string) || isIntenger(string);
}

function isDelimiter(string) {
  if (string.length > 1) return false;
  let delimiters = ",{}[]();";
  return delimiters.indexOf(string) !== -1 ? true : false;
}

function isComment(string) {
  let statusTable = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 0, 3, 0],
    [0, 0, 4, 3],
    [0, 5, 4, 3],
    [0, 0, 0, 0],
  ];
  let finalStatus = [5];
  let transitions = ["/", "*", "_others"];

  return FakeAutomata({
    statusTable,
    finalStatus,
    transitions,
    string,
  });
}

function analyzeWord(word) {
  if (word.length === 0) {
    return 0;
  } else if (isKeyword(word)) {
    return 1;
  } else if (isIdentifier(word)) {
    return 2;
  } else if (isOperator(word)) {
    return 3;
  } else if (isDelimiter(word)) {
    return 4;
  } else if (isConstant(word)) {
    return 5;
  } else if (isComment(word)) {
    return 6;
  } else {
    return 0;
  }
}

/**
 * 读取字符串，返回一个json数组
 * @param 字符串
 * @returns 一个json数组
 */
function analyzeString(string) {
  let content = string.replace(/[\r\n]/g, "");
  let result = [];

  while (content.length > 0) {
    let buffer = content.slice();
    let index = content.length - 1;

    for (; analyzeWord(buffer) === 0 && index > 0; index--) {
      buffer = buffer.substring(0, buffer.length - 1);
    }

    if (index === 0 && analyzeWord(buffer) === 0) {
      content = content.substring(1);
    } else {
      result.push({
        type: analyzeWord(buffer),
        content: buffer,
        key: result.length
      });
      content = content.substring(index + 1);
    }
  }

  return result;
}

export default analyzeString;
