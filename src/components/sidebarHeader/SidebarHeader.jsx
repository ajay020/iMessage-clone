import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import db, { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

import "./sidebarHeader.css";
// import { useState } from "react";

const SidebarHeader = ({ searchGroup }) => {
  const user = useSelector(selectUser);

  const addChatName = () => {
    const chatName = prompt("Enter a chat name");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <div className="sidebar__header">
      <Avatar
        onClick={() => auth.signOut()}
        src={user.photo}
        className="avatar"
      />
      <div className="sidebar__input">
        <SearchIcon />
        <input
          className=""
          onChange={(e) => searchGroup(e.target.value)}
          type="text"
          placeholder="Search..."
        />
      </div>
      <IconButton onClick={addChatName}>
        <RateReviewOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default SidebarHeader;
