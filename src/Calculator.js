import React from "react";
import { connect } from "react-redux";

class Calculator extends React.Component {
  constructor() {
    super();
    console.log("props", this.props);
    this.keys = [
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
    ];
  }
  isDigit(key) {
    return !isNaN(parseInt(key, 10));
  }
  isOperator(key) {
    key = key.trim();
    return key == "+" || key == "-" || key == "*" || key == "/" || key == "%";
  }
  isHelper(key) {
    return key === "(" || key === ")" || key === ".";
  }
  addKeys(newKey = "") {
    console.log(newKey);
    let newKeys = [...this.props.keysPressed];
    let result = "";

    if (newKey === " = ") {
      try {
        if (newKeys.length) {
          this.isOperator(newKeys[newKeys.length - 1]) && newKeys.pop();
           result = window.math.evaluate(
            this.props.keysPressed.join(" ").replace(/ /g, "")
          );
          this.props.add({
            payLoad: { result: result, keysPressed: newKeys },
            type: "add"
          });
        }
        return;
      } catch (e) {
        console.log("wrong inut", newKeys.join());
      }
    }

    if (newKey === "C") {
      this.props.add({ payLoad: { result: "", keysPressed: [] }, type: "add" });
      return;
    }

    // if it's a digit or (, ), .
    if (this.isDigit(newKey) || this.isHelper(newKey)) {
      newKeys.push(newKey);
    } else if (this.isOperator(newKey)) {
      console.log("operator");
      // new key might be +,-,*,/,%
      // check if the last one is also an operator
      if (newKeys.length && this.isOperator(newKeys[newKeys.length - 1])) {
        newKeys.pop();
      }
      newKeys.length && newKeys.push(newKey);
    }
    if (newKey == "." && newKeys[newKeys.length - 2] == ".") {
      newKeys.pop();
    }
    this.props.add({
      payLoad: { result: result, keysPressed: newKeys },
      type: "add"
    });
  }

  render() {
    return (
      <div className="cal">
        <div id="display">
          <div id="expression">{this.props.keysPressed.join("")}</div>
          <div id="result"> {this.props.result}</div>
        </div>
        {this.keys.map((d, i) => (
          <span onClick={e => this.addKeys(d)} key={i} className="key">
            {d}
          </span>
        ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return { result: state.result, keysPressed: state.keysPressed };
};

const mapDispachToProps =(dispatch)=>{
  return {
    add(action){
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Calculator);
