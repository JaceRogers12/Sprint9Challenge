import React, {useState} from 'react'
import axios from "axios";

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  let [message, setMessage] = useState(initialMessage);
  let [email, setEmail] = useState(initialEmail);
  let [steps, setSteps] = useState(initialSteps);
  let [index, setIndex] = useState(initialIndex);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const coordinates = ["(1, 1)", "(2, 1)", "(3, 1)", "(1, 2)",
    "(2, 2)", "(3, 2)", "(1, 3)", "(2, 3)", "(3, 3)"];
    return coordinates[index];
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    let position = getXY();
    return `Coordinates ${position}`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction == "up") return index -3;
    if (direction == "down") return index +3;
    if (direction == "left") return index -1;
    if (direction == "right") return index +1;
  }

  function boundaries(number, direction) {
    if (number < 0 || number > 8) return null;
    if (direction == "right" && (index == 2 || index == 5)) return null;
    if (direction == "left" && (index == 3 || index == 6)) return null;
    return "S'all good!";
  }

  function move(direction) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    let nextIndex = getNextIndex(direction);
    boundaries(nextIndex, direction)? setIndex(nextIndex) : setMessage(`You can't go ${direction}`);
    boundaries(nextIndex, direction)? setSteps(steps + 1) : null;
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    let payload = {
      x: getXY()[1],
      y: getXY()[4],
      steps: steps,
      email: email,
    };
    axios.post("http://localhost:9000/api/result", payload)
      .then(res => {
        console.log(res);
        setMessage(res.data.message)
      })
      .catch(res => {
        console.log(res);
        setMessage(res.response.data.message);
      })
      .finally(() => setEmail(initialEmail));
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} {steps == 1? "time": "times"}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={evt => move("left")}>LEFT</button>
        <button id="up" onClick={evt => move("up")}>UP</button>
        <button id="right" onClick={evt => move("right")}>RIGHT</button>
        <button id="down" onClick={evt => move("down")}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={evt => onSubmit(evt)}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={evt => onChange(evt)}></input>
        <input id="submit" type="submit" test-id="submit"></input>
      </form>
    </div>
  )
}
