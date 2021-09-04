import Chat from "../chat/Chat";
import Sidebar from "../sidebar/Sidebar";
import "./imessage.css";

const Imessage = () => {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Imessage;
