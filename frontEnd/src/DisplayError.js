import React from "react";
import './DisplayError.css'
function DisplayError(props) {


  let errorDisplay = props.errorDisplay;
 

  return (
 <ul>
    <li>{errorDisplay.firstname}</li>
    <li>{errorDisplay.surname}</li>
    <li>{errorDisplay.course}</li>
    <li>{errorDisplay.localization}</li>
 </ul>
  );
}

export default DisplayError;