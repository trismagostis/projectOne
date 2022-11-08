import React, { useState, useRef } from "react";
import axios from "axios";
import Display from "./Display";
function Registration() {
  const [listDisplay, setListDisplay] = useState([]);
  let firstName = useRef(0);
  let surName = useRef(0);
  let course = useRef(0);
  let localization = useRef(0);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(firstName.current.value);
    console.log(surName.current.value);
    console.log(course.current.value);
    console.log(localization.current.value);
    axios
      .post("http://localhost:8080/api/add", {
        firstName: firstName.current.value,
        surName: surName.current.value,
        course: course.current.value,
        localization: localization.current.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        axios
          .get("http://localhost:8080/api/all")
          // .then(res => res.json())
          .catch((error) => {
            console.log("Error:", error);
          })
          .then((res) => {
            setListDisplay(res.data);
          });
      });
  };

  const removeElement = (idToRemove) => {
    setListDisplay(listDisplay.filter((item) => item._id !== idToRemove));
    console.log(listDisplay);
    axios.delete("http://localhost:8080/api/" + idToRemove);
    // .then(res => JSON.parse(res))
  };
  // console.log(listDisplay);

  return (
    <div id="forms">
      <form
        method="POST"
        action="http://localhost:8080/api/add"
        onSubmit={handleSubmit}
      >
        <label>
          Wpisz imię:
          <input type="text" name="firstName" ref={firstName} />
        </label>
        <label>
          Wpisz nazwisko:
          <input type="text" name="surName" ref={surName} />
        </label>
        <label>
          Wybierz rodzaj kursu
          <select name="course" ref={course}>
            <option>---</option>
            <option>full stack</option>
            <option>front</option>
            <option>end</option>
          </select>
        </label>
        <label>
          Wybierz miejsce kursu
          <select name="localization" ref={localization}>
            <option>---</option>
            <option>Warszawa</option>
            <option>Kraków</option>
            <option>online</option>
          </select>
        </label>
        <button type="submit">send</button>
      </form>
      <Display listDisplay={listDisplay} removeUserMethod={removeElement} />
    </div>
  );
}

export default Registration;
