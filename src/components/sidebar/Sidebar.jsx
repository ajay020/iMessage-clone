import { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import SidebarChat from "../sidebarchat/SidebarChat";
import db, { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./sidebar.css";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addChatName = () => {
    const chatName = prompt("Enter a chat name");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          onClick={() => auth.signOut()}
          src={user.photo}
          className="avatar"
        />
        <div className="sidebar__input">
          <SearchIcon />
          <input className="" type="text" placeholder="Search..." />
        </div>
        <IconButton onClick={addChatName}>
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
