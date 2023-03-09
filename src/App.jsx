import { useEffect, useState } from "react";
import "./App.css";
import DisplayContainer from "./components/DisplayContainer/displaycontainer";
import DisplayResult from "./components/DisplayResult/displayresult";
import DisplayCalculation from "./components/DisplayCalculation/displaycalculation";
import ButtonContainer from "./components/ButtonContainer/buttoncontainer";
import Button from "./components/Button/button";

const buttonKeys = [
  "AC",
  "C",
  "/",
  "-",
  "=",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "+",
  "1",
  "2",
  "3",
  "0",
  ".",
];

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("0");
  const [num, setNum] = useState("");
  const [operator, setOperator] = useState();
  const [calc, setCalc] = useState("");

  const handleButtonClick = (e) => {
    const val = e.target.innerHTML;
    if (val === "C") {
      handleBackSpace();
      return;
    }
    if (val === "AC") {
      handleAllClear();
      return;
    }
    if (val === "=") {
      setOperator(val);
      handleEqual();
      return;
    }
    if (calc.length + num.length === 14) return;
    if (val === ".") {
      //check if current number contains '.'
      if (num.indexOf(".") >= 0) return;
      //check if current number contains any number, if it doesnt add a zero before the number
      if (num.length < 1) {
        handleDecimal("addZero");
        return;
      }
      //else
      handleDecimal();

      return;
    }

    if (val === "-" || val === "+" || val === "/" || val === "*") {

      

      if (operator === "=") {
        // start calculation with previous result
        setNum(result + val);
        setOperator(val);
        return;
      }
     
      setNum((prev) => prev + val);
      setOperator(val);
      return;
    }
    if (operator === "=") {
      // initiate new calculation with num 
      setNum((prev) => prev + val);
      setOperator();
      return;
    }
    setNum((prev) => prev + val);
  };

  const handleDecimal = (val) => {
    if (val === "addZero") {
      // if this is the first input in the num, add a zero in front of it
      setNum((prev) => "0." + prev);
    } else {
      setNum((prev) => prev + ".");
    }
  };

  const handleEqual = () => {
    const total = calc + num;
    if (!total) return
    try {
      const res = eval(total);
      setResult(res);
      setCalc("");
      setNum("");
    } catch (e) {
      setResult('Error')
    }
  };

  const handleAllClear = () => {
    // reset everything
    setCalc("");
    setNum("");
    setResult("0");
  };

  const handleBackSpace = () => {
    // delete the last element of num(if its true) or calc
    if (num) {
      setNum((prev) => prev.slice(0, num.length - 1));
    } else {
      setCalc((prev) => prev.slice(0, calc.length - 1));
    }
  };

  useEffect(() => {
    //set display anytime calc or num changes, ie anytime there's an addition
    const disp = calc + num;

    setDisplay(disp);
  }, [calc, num]);

  useEffect(() => {
    //anytime the operator changes, set the num to calc and reset num to empty
    setCalc((prev) => prev + num);
    setNum("");
  }, [operator]);

  return (
    <div className="App">
      <section className="container">
        <DisplayContainer>
          <DisplayCalculation calc={display} />
          <DisplayResult res={result} />
        </DisplayContainer>
        <ButtonContainer>
          {buttonKeys.map((button, i) => (
            <Button
              key={button + i}
              button={button}
              click={handleButtonClick}
            />
          ))}
        </ButtonContainer>
      </section>
    </div>
  );
}

export default App;
