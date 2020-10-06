import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";


import {InfoBar} from '../InfoBar/InfoBar';
import {Input} from '../Input/Input';
import {Messages} from '../Messages/Messages';
import {TextContainer} from '../TextContainer/TextContainer'

import './Chat.css';

let socket;

export const Chat = ({ location }) => {
  const room = 'askpython'
  const [name, setName] = useState('');
  const [typing, setTyping] = useState(false);
  // const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = process.env.REACT_APP_API;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    // setRoom(room);
    setName(name)
    console.log(room)
    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(msgs => [ ...msgs, message ]);
    });

    socket.on('typing', status => {
      setTyping(status);
    });
}, []);


  const sendMessage = (event) => {
    event.preventDefault();

    let clonedMessage = message.repeat(1)
    if(clonedMessage) {
      socket.emit('sendMessage', clonedMessage, () => setMessage(''));
    }

    setMessage('')
  }


  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} typing={typing} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}