import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Display from "./Display";
import DisplayError from "./DisplayError";
import "./Registration.css";

function Registration() {
  const [listDisplay, setListDisplay] = useState([]);

  let registrationRef = {
    firstName: useRef(0),
    surName: useRef(0),
    course: useRef(0),
    localization: useRef(0),
  };

  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    course: "---",
    localization: "---",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    surname: "",
    course: "",
    localization: "",
  });

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    console.log("uaktualniono listDisplay");
  }, [listDisplay]);

  const validate = (formData) => {
    let validationErrors = {
      firstname: false,
      surname: false,
      course: false,
      localization: false,
    };

    if (formData.firstName.trim().length < 2) {
      validationErrors.firstname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          firstname: "firstname should have at least 2 characters",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.firstName.trim())) {
      validationErrors.firstname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          firstname: "firstname should'n have empty characters",
        };
      });
    } else {
      validationErrors.firstname = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, firstname: "" };
      });
    }

    if (formData.surName.trim().length < 2) {
      validationErrors.surname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          surname: "surname should have at least 2 characters",
        };
      });
    } else if (!/^[^\s]*$/.test(formData.surName.trim())) {
      validationErrors.surname = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          surname: "surname should'n have empty characters",
        };
      });
    } else {
      validationErrors.surname = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, surname: "" };
      });
    }

    if (formData.course === "---") {
      validationErrors.course = true;
      console.log("course");
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          course: "u should choose course",
        };
      });
    } else {
      validationErrors.course = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, course: "" };
      });
    }

    if (formData.localization === "---") {
      validationErrors.localization = true;
      setErrors((prevErrors) => {
        return { ...prevErrors, localization: "u should choose localization" };
      });
    } else {
      validationErrors.localization = false;
      setErrors((prevErrors) => {
        return { ...prevErrors, localization: "" };
      });
    }

    return (
      !validationErrors.firstname &&
      !validationErrors.surname &&
      !validationErrors.course &&
      !validationErrors.localization
    );
  };

  const fetchList = () => {
    axios
      .get("http://localhost:8080/api/all")
      .then((res) => {
        setListDisplay(res.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(validate(formData));

    if (validate(formData)) {
      axios
        .post("http://localhost:8080/api/add", {
          firstName: registrationRef.firstName.current.value,
          surName: registrationRef.surName.current.value,
          course: registrationRef.course.current.value,
          localization: registrationRef.localization.current.value,
        })
        // .then(function (response) {
        //   console.log(response);
        // })
        .then(function () {
          fetchList();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: target.value,
    });
  };

  const removeElement = (idToRemove) => {
    setListDisplay(listDisplay.filter((item) => item._id !== idToRemove));
    console.log(listDisplay);
    axios.delete("http://localhost:8080/api/" + idToRemove);
  };
  // console.log(errors);
  return (
    <div id="forms">
      <form
        method="POST"
        action="http://localhost:8080/api/add"
        onSubmit={handleSubmit}
      >
        <label>
          Wpisz imię:
          <input
            type="text"
            name="firstName"
            ref={registrationRef.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Wpisz nazwisko:
          <input
            type="text"
            name="surName"
            ref={registrationRef.surName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Wybierz rodzaj kursu
          <select
            name="course"
            ref={registrationRef.course}
            onChange={handleInputChange}
          >
            <option>---</option>
            <option>full stack</option>
            <option>front</option>
            <option>end</option>
          </select>
        </label>
        <label>
          Wybierz miejsce kursu
          <select
            name="localization"
            ref={registrationRef.localization}
            onChange={handleInputChange}
          >
            <option>---</option>
            <option>Warszawa</option>
            <option>Kraków</option>
            <option>online</option>
          </select>
        </label>
        <label>
          Wyślij dane
          <button type="submit" className="send">send</button>
        </label>
      </form>
      <DisplayError errorDisplay={errors} />
      <Display listDisplay={listDisplay} removeUserMethod={removeElement} />
    </div>
  );
}

export default Registration;
