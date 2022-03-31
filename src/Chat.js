import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar } from '@material-ui/core';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import { useParams } from "react-router-dom";
import db from "./firebase";
import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';

function Chat() {
	const [input, setInput] = useState('');
	const sendMessage = e => {};
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState('');

	
	useEffect(() => {
		if (roomId) {
			const docRef = doc(db, "rooms", roomId);
			const docSnap = getDoc(docRef);
			getDoc(docRef).then((snapshot) => {(setRoomName(snapshot.data().name))});
		}
	}, [roomId])

	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />
				<div className="chat__headerInfo">
					<h3> {roomName}</h3>
					<p> Last seen... </p>
				</div>
			</div>

			<div className="chat__body">
				<p className="chat__message">
					That's an message
					<span className="chat__name">Orel BigCock</span>
					<span className="time__stamp">10:03pm</span>
				</p>
			</div>

			<div className="chat__footer">
				<div className="chat__footerIcons">
					<SentimentSatisfiedOutlinedIcon />
					<MicRoundedIcon />
				</div>
				<form>
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<button onClick={sendMessage} type="submit">
						{' '}
						send{' '}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Chat;
