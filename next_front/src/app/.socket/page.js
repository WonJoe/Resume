import OnlineUsers from "@/app/socket/OnlineUsers";
import ChatWindow from "@/app/socket/ChatWindow";
import ChatRooms from "@/app/socket/ChatRooms";

export default function Home() {
  const onlineUsers = ["User 1", "User 2", "User 3"];
  const chatRooms = ["Room 1", "Room 2", "Room 3"];

  return (
    <div className="container mt-5" style={{ maxWidth: "1000px" }}>
      <h2 className="text-center mb-4">Chat</h2>
      <div className="row">
        <div className="col-3">
          <OnlineUsers users={onlineUsers} />
        </div>
        <div className="col-6">
          <ChatWindow />
        </div>
        <div className="col-3">
          <ChatRooms rooms={chatRooms} />
        </div>
      </div>
    </div>
  );
}