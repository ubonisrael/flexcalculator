import React from "react";
import "./button.css";

const Button = ({ button, click }) => (
  <button
    onClick={click}
    className={
      button === "AC"
        ? "all_clear button"
        : button === "="
        ? "equals button"
        : button === '0'
        ? 'zero button'
        : "button"
    }
  >
    {button}
  </button>
);

export default Button;
