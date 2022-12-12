import * as React from 'react';
import { useState } from 'react';
import styles from './styles/countdown.module.css';
import { useParams } from 'react-router-dom';
const tmi = require('tmi.js');

const timeData = {
  timer: 0,
  start: 0,
  isStoped: false,
  remaining: 0,
  connected: false,
  colorChoices: ['black', 'blue', 'red', 'green', 'white'],
  funnyTime: 0,
  follow: 'off',
  followtime: 5,
};

export default function Countdown() {
  const [timer, setTimer] = useState('00:00:00');
  const [colorText, setColorText] = useState('white');
  const { userName } = useParams();

  chatCommands(userName);

  return (
    <div id="timer" className={styles.timer} style={{ color: colorText }}>
      {timer}
    </div>
  );

  function chatCommands(user) {
    const regexFilter = new RegExp(/^!cd\s([a-zA-Z0-9]+)(?:\W+)?(\S*)/);
    if (!timeData.connected && user) {
      const client = new tmi.Client({
        connection: { reconnect: true },
        channels: [`${user}`],
      });
      client.connect();
      timeData.connected = true;
      /*
      client.on('redeem', (channel, username, rewardType, tags) => {
        console.log(rewardType);
        console.log(tags);
        console.log('redeemed');
      });
*/
      client.on('message', (channel, tags, message, self) => {
        if (message.match(regexFilter) === null) return;
        const [, command, argument] = message.match(regexFilter);
        if (
          tags.badges &&
          (tags.badges.moderator || tags.badges.broadcaster) &&
          command
        ) {
          switch (command) {
            case 'start':
              console.log('Countdown started.');
              if (argument && !isNaN(argument)) {
                start(argument);
              } else {
                start();
              }
              break;

            case 'stop':
              console.log('Countdown stoped.');
              stop();
              break;

            case 'add':
              if (!argument || isNaN(argument)) return;
              console.log(`${argument} minutes added.`);
              add(argument);
              break;

            case 'reset':
              console.log('Countdown reseted');
              reset();
              break;

            case 'color':
              if (!argument) return;
              console.log('Countdown color changed');
              if (timeData.colorChoices.includes(argument)) {
                setColorText(argument);
              }
              break;

            case 'funnytime':
              console.log('Its Funny Time');
              if (!timeData.funnyTime) {
                timeData.funnyTime = setInterval(() => {
                  setColorText(
                    timeData.colorChoices[
                      Math.floor(Math.random() * timeData.colorChoices.length)
                    ]
                  );
                }, 200);
              } else {
                clearInterval(timeData.funnyTime);
              }

              setColorText(argument);
              break;
            /*
            case 'follow':
              if (!argument) return;
              if (argument === 'on' || argument === 'off') {
                timeData.follow = argument;
              }
              break;

            case 'followtime':
              if (!argument || isNaN(argument)) return;
              timeData.follow = 'on';
              timeData.followtime = argument;

              break;
*/
            default:
            //Do nothing
          }
        }
      });

      //TODO: implement followtime into showTimer and add track new unique follower // Doesnt work with the tmi js lib. Same with custom channel point rewards
      //TODO: if follow on play animation activated
      //TODO: add auf maximum setzen und nicht reset
    }
  }

  function start(x = 10) {
    let countDownDate;
    if (x > 6000) {
      x = 6000;
    }
    if (timeData.remaining !== 0 && timeData.isStoped === true) {
      countDownDate = timeData.remaining;
    } else {
      countDownDate = new Date().getTime() + x * 60000;
    }
    timeData.start = countDownDate;
    showTimer();
  }

  function stop() {
    timeData.isStoped = true;
    clearInterval(timeData.timer);
  }

  function reset() {
    clearInterval(timeData.timer);
    timeData.remaining = 0;
    timeData.isStoped = true;
    setTimer('00:00:00');
  }

  function add(x) {
    if (timeData.start === 0) {
      timeData.isStoped = true;
    }
    timeData.start = timeData.start + x * 60000;
    timeData.remaining = timeData.remaining + x * 60000;
    let seconds = Math.floor((timeData.remaining / 1000) % 60);
    let minutes = Math.floor((timeData.remaining / 1000 / 60) % 60);
    let hours = Math.floor(timeData.remaining / 1000 / 60 / 60);
    console.log(hours);

    if (hours > 99) {
      setTimer('100:00:00');
    } else {
      setTimer(
        String(hours).padStart(2, '0') +
          ':' +
          String(minutes).padStart(2, '0') +
          ':' +
          String(seconds).padStart(2, '0')
      );
    }
  }

  function showTimer() {
    if (timeData.remaining !== 0 && timeData.isStoped === true) {
      timeData.start = timeData.remaining + new Date().getTime();
    } else if (timeData.remaining !== 0) {
      return;
    }
    timeData.isStoped = false;
    timeData.timer = setInterval(() => {
      let total = timeData.start - new Date().getTime();
      timeData.remaining = total;
      console.log(total);
      if (total <= 100) {
        reset();
        //TODO: play a sound file or something
      } else {
        let seconds = Math.floor((total / 1000) % 60);
        let minutes = Math.floor((total / 1000 / 60) % 60);
        let hours = Math.floor(total / 1000 / 60 / 60);

        setTimer(
          String(hours).padStart(2, '0') +
            ':' +
            String(minutes).padStart(2, '0') +
            ':' +
            String(seconds).padStart(2, '0')
        );
      }
    }, 100);
  }
}
