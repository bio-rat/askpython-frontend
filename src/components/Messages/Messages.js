import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";
// import typingGif from '../../../public/typing.gif'

import { Message } from "./Message/Message";

import "./Messages.css";

export const Messages = ({ messages, name, typing }) => (
  <ScrollToBottom className="messages" followButtonClassName="scroll">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}

    {typing && (
      <div className="messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText colorDark blink">Admin is typing ...</p>
        </div>
      </div>
    )}
  </ScrollToBottom>
);
