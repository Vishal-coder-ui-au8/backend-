import React, { Component } from "react";

class KeyPad extends Component {
  buttonHandler = (e) => {
    this.props.onClick(e.target.name);
  };

  render() {
    return (
      <div className="button">
        <button name="(" onClick={this.buttonHandler}>
          (
        </button>
        <button name="CE" onClick={this.buttonHandler}>
          CE
        </button>
        <button name=")" onClick={this.buttonHandler}>
          )
        </button>
        <button name="C" onClick={this.buttonHandler}>
          C
        </button>
        <br />

        <button name="1" onClick={this.buttonHandler}>
          1
        </button>
        <button name="2" onClick={this.buttonHandler}>
          2
        </button>
        <button name="3" onClick={this.buttonHandler}>
          3
        </button>
        <button name="+" onClick={this.buttonHandler}>
          +
        </button>
        <br />

        <button name="4" onClick={this.buttonHandler}>
          4
        </button>
        <button name="5" onClick={this.buttonHandler}>
          5
        </button>
        <button name="6" onClick={this.buttonHandler}>
          6
        </button>
        <button name="-" onClick={this.buttonHandler}>
          -
        </button>
        <br />

        <button name="7" onClick={this.buttonHandler}>
          7
        </button>
        <button name="8" onClick={this.buttonHandler}>
          8
        </button>
        <button name="9" onClick={this.buttonHandler}>
          9
        </button>
        <button name="*" onClick={this.buttonHandler}>
          x
        </button>
        <br />

        <button name="." onClick={this.buttonHandler}>
          .
        </button>
        <button name="0" onClick={this.buttonHandler}>
          0
        </button>
        <button name="=" onClick={this.buttonHandler}>
          =
        </button>
        <button name="/" onClick={this.buttonHandler}>
          ÷
        </button>
        <br />
      </div>
    );
  }
}

export default KeyPad;
