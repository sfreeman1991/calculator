export default {
  keys: [
    "(",
    ")",
    "%",
    "C",
    "7",
    "8",
    "9",
    " / ",
    "4",
    "5",
    "6",
    " * ",
    "1",
    "2",
    "3",
    " - ",
    "0",
    ".",
    " = ",
    " + "
  ],
  isDigit: key => !isNaN(parseInt(key, 10)),

  isOperator: key => {
    key = key.trim();
    return key == "+" || key == "-" || key == "*" || key == "/" || key == "%";
  },

  isHelper: key => key === "(" || key === ")" || key === "."
};
