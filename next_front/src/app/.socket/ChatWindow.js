"use client";

import { useState } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  return (
    <div
      className="border rounded shadow-sm d-flex flex-column"
      style={{ height: "500px", overflow: "hidden" }}
    >
      <div
        id="message-list"
        className="flex-grow-1 p-3"
        style={{ overflowY: "auto", backgroundColor: "#f8f9fa" }}
      >
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="fw-bold">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>
      <div
        className="p-3 border-top d-flex"
        style={{ backgroundColor: "#fff" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control me-2"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
}
