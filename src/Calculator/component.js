import React from "react";
import { connect } from "react-redux";
import helpers from './helpers';
import "./style.css";

class Calculator extends React.Component {
  constructor() {
    super();
    console.log("props", this.props);
    this.keys = helpers.keys;
  }
  
  addKeys(newKey = "") {
    console.log(newKey);
    let newKeys = [...this.props.keysPressed];
    let result = "";

    if (newKey === " = ") {
      try {
        if (newKeys.length) {
          helpers.isOperator(newKeys[newKeys.length - 1]) && newKeys.pop();
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
        alert("wrong input");
        newKeys=[];
        this.props.add({type:"add", payLoad:{result:"",keysPressed:newKeys}});
        console.log("wrong inut", newKeys.join());
      }
    }

    if (newKey === "C") {
      this.props.add({ payLoad: { result: "", keysPressed: [] }, type: "add" });
      return;
    }

    // if it's a digit or (, ), .
    if (helpers.isDigit(newKey) || helpers.isHelper(newKey)) {
      newKeys.push(newKey);
    } else if (helpers.isOperator(newKey)) {
      console.log("operator");
      // new key might be +,-,*,/,%
      // check if the last one is also an operator
      if (newKeys.length && helpers.isOperator(newKeys[newKeys.length - 1])) {
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
