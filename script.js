const division = document.querySelector(".divide");
const multiplication = document.querySelector(".multiply");
const addition = document.querySelector(".add");
const subtraction = document.querySelector(".substract");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const thousand = document.querySelector(".threezero");
const backBtn = document.querySelector(".backbutton");

let topDisplayer = document.querySelector("#top-displayer");
let bottomDisplayer = document.querySelector("#bottom-displayer");

const numbers = document.querySelectorAll(".numbers");
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", function () {
    bottomDisplayer.innerText += Number(numbers[i].innerText);
  });
}

division.addEventListener("click", function () {
  oneOperation("/", "+", "x", "-");
});

multiplication.addEventListener("click", function () {
  oneOperation("x", "+", "/", "-");
});

addition.addEventListener("click", function () {
  oneOperation("+", "/", "x", "-");
});

subtraction.addEventListener("click", function () {
  checkNegativeNumber();
  oneOperation("-", "+", "x", "/");
});

equals.addEventListener("click", function () {
  if (bottomDisplayer.innerText.slice(1).includes("-")) {
    checkNegativeNumber();
    oneOperation("-", "+", "x", "/");
    return;
  } else {
    calculate();
  }
});

clear.addEventListener("click", function () {
  return clearNumbers();
});

decimal.addEventListener("click", function () {
  if (
    bottomDisplayer.innerText == "" ||
    bottomDisplayer.innerText.slice(-1) == "x" ||
    bottomDisplayer.innerText.slice(-1) == "+" ||
    bottomDisplayer.innerText.slice(-1) == "/" ||
    bottomDisplayer.innerText.slice(-1) == "-"
  ) {
    return;
  }
  bottomDisplayer.innerText += ".";
});

thousand.addEventListener("click", function () {
  for (let i = 0; i < 3; i++) {
    bottomDisplayer.innerText += "0";
  }
});

backBtn.addEventListener("click", function () {
  let newText = bottomDisplayer.innerText.slice(
    0,
    bottomDisplayer.innerText.length - 1
  );
  bottomDisplayer.innerText = newText;
});

//Functions

function clearNumbers() {
  bottomDisplayer.innerText = "";
  topDisplayer.innerText = "";
}

function operate(n1, symbol, n2) {
  let result;
  switch (symbol) {
    case "+":
      result = Number(n1) + Number(n2);
      break;
    case "-":
      result = Number(n1) - Number(n2);
      break;
    case "x":
      result = Number(n1) * Number(n2);
      break;
    case "/":
      result = Number(n1) / Number(n2);
      break;
  }
  return +result.toFixed(5);
}

function calculate() {
  let symbols = ["/", "+", "-", "x"];
  for (let i = 0; i < symbols.length; i++) {
    if (bottomDisplayer.innerText.indexOf(symbols[i]) > 0) {
      let substr1 = bottomDisplayer.innerText.slice(
        0,
        bottomDisplayer.innerText.indexOf(symbols[i])
      );
      let substr2 = bottomDisplayer.innerText.slice(
        bottomDisplayer.innerText.indexOf(symbols[i]) + 1
      );
      if (substr1 && substr2) {
        setTopDisplayer();
        bottomDisplayer.innerText = operate(substr1, symbols[i], substr2);
      }
    }
  }
}

function checkSymbols() {
  if (
    bottomDisplayer.innerText.indexOf("x") > 0 ||
    bottomDisplayer.innerText.indexOf("/") > 0 ||
    bottomDisplayer.innerText.indexOf("+") > 0 ||
    bottomDisplayer.innerText.lastIndexOf("-") > 0
  ) {
    calculate();
  }
}

function oneOperation(a, b, c, d) {
  checkSymbols();
  if (
    bottomDisplayer.innerText == "" ||
    bottomDisplayer.innerText[bottomDisplayer.innerText.length - 1] === a
  ) {
    return;
  } else if (
    bottomDisplayer.innerText.slice(-1) === b ||
    bottomDisplayer.innerText.slice(-1) === c ||
    bottomDisplayer.innerText.slice(-1) === d
  ) {
    if (
      bottomDisplayer.innerText[bottomDisplayer.innerText.length - 1] === "+"
    ) {
      let newText = bottomDisplayer.innerText.replace(
        bottomDisplayer.innerText[bottomDisplayer.innerText.length - 1],
        a
      );
      bottomDisplayer.innerText = newText;
      return;
    }
    let newText = bottomDisplayer.innerText.replace(
      new RegExp(
        bottomDisplayer.innerText[bottomDisplayer.innerText.length - 1] + "$"
      ),
      a
    );
    bottomDisplayer.innerText = newText;
    return;
  }
  bottomDisplayer.innerText += a;
}

function setTopDisplayer() {
  let hold = "";
  hold = bottomDisplayer.innerText;
  topDisplayer.innerText = hold + " = ";
}

function checkNegativeNumber() {
  if (bottomDisplayer.innerText[0] == "-") {
    let substr1 = bottomDisplayer.innerText.slice(
      0,
      bottomDisplayer.innerText.lastIndexOf("-")
    );
    let substr2 = bottomDisplayer.innerText.slice(
      bottomDisplayer.innerText.lastIndexOf("-") + 1
    );
    if (substr1 && substr2) {
      setTopDisplayer();
      bottomDisplayer.innerText = operate(substr1, "-", substr2);
    }
  }
}
