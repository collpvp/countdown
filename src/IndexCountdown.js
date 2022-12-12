import * as React from 'react';
import Accordion from './modules/homepage-cd';
import 'bootstrap/dist/css/bootstrap.css';
//import './styles/countdown.module.css';
import { useEffect, useState } from 'react';

const startText =
  '<div><code>!cd start</code> Starts the countdown with a default 10 minutes.</div><div><code>!cd start 20</code> Starts the countdown with 20 minutes, but you can type any other amount.</div>';
const stopText =
  '<div><code>!cd stop</code> Stops the countdown. It can be continued by using the start command.</div>';
const addText =
  '<div><code>!cd add 5</code> Adds the amount given to the countdown. Can also be used as a stopped start command.</div>';
const resetText =
  '<div><code>!cd reset</code> Resets the countdown. Can be restarted by using the start command.</div>';
const colorText =
  '<div><code>!cd color</code> Changes the color of the displayed numbers.</div><div>Current options are <code>white, black, blue, red, green</code>.</div>';

export default function IndexCountdown() {
  const [userName, setUserName] = useState('');
  //useEffect change background maybe
  const handleChange = (event) => {
    setUserName(event.target.value);
  };
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, []);
  return (
    <main className="container pt-5">
      <label htmlFor="cd-url" className="form-label">
        Type your Username in the box below.
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="countdown-url">
          http://localhost:3000/countdown/
        </span>
        <input
          type="text"
          className="form-control"
          id="cd-url"
          aria-describedby="countdown-url"
          value={userName}
          onChange={handleChange}
        ></input>
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-copy"
          text={userName}
          onClick={() => {
            navigator.clipboard.writeText(
              'http://localhost:3000/countdown/' + userName
            );
          }}
        >
          Copy URL
        </button>
      </div>
      <div className="accordion" id="accordiondeample">
        {Accordion('commandOne', 'startCommand', '!cd start', startText)}
        {Accordion('commandTwo', 'stopCommand', '!cd stop', stopText)}
        {Accordion('commandThre', 'addCommand', '!cd add', addText)}
        {Accordion('commandFour', 'resetCommand', '!cd reset', resetText)}
        {Accordion('commandFive', 'colorCommand', '!cd color', colorText)}
      </div>
    </main>
  );
}
