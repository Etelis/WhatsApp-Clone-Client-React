import React from 'react';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./SidebarChat.css";


function SidebarChat({ id, name, addNewChat }) {
  return (
    <Link to={`/rooms/${id}`}>
    <div className="sidebarChat">
        <div className="sidebarChat__profilePic">
          <Avatar />
        </div>
        <div className="sidebarChat__info">
          <h2>
            {name}
          </h2>
          Last message...
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;