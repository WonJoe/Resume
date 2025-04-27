"use client";

export default function OnlineUsers({ users }) {
  return (
    <div
      className="border rounded shadow-sm"
      style={{ height: "500px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
    >
      <h5 className="p-3">Online Users</h5>
      <ul className="list-group">
        {users.map((user, index) => (
          <li className="list-group-item" key={index}>
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
