import React from "react";
import { Textfit } from "react-textfit";
import "./displayresult.css";



const DisplayResult = ({ res }) => (
  <article className="display_result">
    <Textfit mode="single" max={30}
        >
    {res}
    </Textfit>
  </article>
);

export default DisplayResult;
