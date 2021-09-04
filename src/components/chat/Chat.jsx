import { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import FlipMove from "react-flip-move";
import "./chat.css";
import Message from "./../message/Message";
import { useSelector } from "react-redux";
import { selectChatName } from "../../features/chatSlice";
import db from "./../../firebase";
import firebase from "firebase";
import { selectChatId } from "./../../features/chatSlice";
import { selectUser } from "./../../features/userSlice";

const Chat = () => {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("chats").doc(chatId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chaf__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} id={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="iMessage"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
