import React, {useState,useEffect} from 'react';
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from './StateProvider';


function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const addPerson = () => {
    const chatName = prompt("Enter desired user");
    if(chatName) {
      const collectionRef = collection(db, "rooms");
      const payload = { name: chatName, };
      addDoc(collectionRef, payload);
    }
  }


  useEffect(() => { onSnapshot(collection(db, "rooms"), (snapshot) => {
    setRooms(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  }); }
  , []);
  
  return (
  <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <div onClick={addPerson}>
          <IconButton>
            <PersonAddTwoToneIcon />
          </IconButton>
          </div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
        <SearchIcon />
        <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <div className="sidebar__chatsContainer">
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;