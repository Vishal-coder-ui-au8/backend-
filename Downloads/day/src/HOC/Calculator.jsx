import React, { Component } from "react";
import KeyPad from "../component/KeyPad";
import Result from "../component/Result";

export class Calculator extends Component {
  constructor() {
    super();

    this.state = {
      result: "",
    };
  }

  calculate = () => {
    try {
      this.setState({
        // eslint-disable-next-line
        result: (eval(this.state.result) || "") + "",
      });
    } catch (e) {
      this.setState({
        result: "error",
      });
    }
  };

  reset = () => {
    this.setState({
      result: "",
    });
  };

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1),
    });
  };

  onClick = button => {

    if(button === "="){
        this.calculate()
    }
    else if(button === "C"){
        this.reset()
    }
    else if(button === "CE"){
        this.backspace()
    }
    else {
        this.setState({
            result: this.state.result + button
        })
    }
    
};

  render() {
    return (
      <div>
        <Result result={this.state.result} />
        <KeyPad onClick={this.onClick} />
      </div>
    );
  }
}

export default Calculator;
