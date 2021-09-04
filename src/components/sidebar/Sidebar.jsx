import { useEffect, useState } from "react";

import SidebarChat from "../sidebarchat/SidebarChat";
import db from "../../firebase";
import "./sidebar.css";
import SidebarHeader from "../sidebarHeader/SidebarHeader";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [searchString, setSearchString] = useState("");

  const searchGroup = (groupName) => {
    setSearchString(groupName);
  };

  let filteredGroup;

  if (searchString) {
    filteredGroup = chats.map(({ id, data: { chatName } }) => {
      if (chatName.toLowerCase().includes(searchString.toLocaleLowerCase())) {
        return <SidebarChat key={id} id={id} chatName={chatName} />;
      }
    });
  }
  const allGroups = chats.map(({ id, data: { chatName } }) => (
    <SidebarChat key={id} id={id} chatName={chatName} />
  ));

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

  return (
    <div className="sidebar">
      <SidebarHeader searchGroup={searchGroup} />
      <div className="sidebar__chats">
        {filteredGroup ? filteredGroup : allGroups}
      </div>
    </div>
  );
};

export default Sidebar;
