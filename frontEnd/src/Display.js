import React from "react";
function Display(props) {
  // const listDisplayOptions = props.listDisplay.map((item, index) => {
  //   return <option key={index} value={index}>{item}</option>;
  // });

  let listDisplay = props.listDisplay;
  let listDisplayTable = listDisplay.map((user, index) => {
    return (
      <tr key={index}>
        <td key={user._id}>{user.firstName}</td>
        <td key={user._id + "1"}>{user.surname}</td>
        <td key={user._id + "2"}>{user.course}</td>
        <td key={user._id + "3"}>
          {user.localization}{" "}
          <span onClick={() => props.removeUserMethod(user._id)}>usuń</span>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <tbody>{listDisplayTable}</tbody>
    </table>
  );
}

export default Display;
