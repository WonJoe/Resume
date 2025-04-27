"use client";

export default function ChatRooms({ rooms }) {
  return (
    <div
      className="border rounded shadow-sm"
      style={{ height: "500px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
    >
      <h5 className="p-3">My Chat Rooms</h5>
      <ul className="list-group">
        {rooms.map((room, index) => (
          <li className="list-group-item" key={index}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
}
