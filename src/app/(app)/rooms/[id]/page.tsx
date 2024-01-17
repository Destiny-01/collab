"use client";

import React, { useState } from "react";
import { ChatFeed } from "react-chat-ui";

function Message() {
  const [messages, setMessages] = useState([]);

  return (
    <div>
      <ChatFeed
        messages={messages} // Array: list of message objects
        hasInputField={true} // Boolean: use our input, or use your own
        showSenderName // show the name of the user who sent the message
        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
        // JSON: Custom bubble styles
        bubbleStyles={{
          text: {
            fontSize: 30,
          },
          chatbubble: {
            borderRadius: 70,
            padding: 40,
          },
        }}
      />
    </div>
  );
}

export default Message;
