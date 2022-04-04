import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton, Input } from '@material-ui/core';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import { useParams } from "react-router-dom";
import db from "./firebase";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import Picker, { SKIN_TONE_LIGHT } from 'emoji-picker-react';
import { SliderInput } from '@mui/material';
import Emoji from './Emoji';

function Chat() {
	const [input, setInput] = useState('');
	const [{user}, dispatch] = useStateValue();
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState('');
	const [messages, setMessages] = useState([]);
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojis, setEmojis] = useState(false);

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
	  };

	useEffect (() => {
		if (roomId) {
			const docRef = doc(db, "rooms", roomId);

			getDoc(docRef).then((snapshot) => {
				setRoomName(snapshot.data().name); 
			});

			getDocs( query(collection(docRef, "messages"), orderBy ("timestamp")))
			.then((snapshot) => {
				setMessages(snapshot.docs.map((doc) => (doc.data()
				)))
			});
			//console.log(docSnap.data());
			//onSnapshot(collection(, ), (snapshot))
		}
	}, [roomId,input]);

	const sendMessage = async (e) => {
		e.preventDefault();
		console.log("you typed >>>", input);
		const docRef = doc(db, "rooms", roomId);
	 	await addDoc(collection(docRef, "messages"), {
			name: user.displayName,
			message: input,
			timestamp: serverTimestamp(),
		}
		);
		setInput("");
	};

	return (
		<div className="chat">
			<div className="chat__header">
									<div className='chat__headerIcon'>
					<Avatar />
					</div>
				<div className="chat__headerInfo">
					<h3> {roomName}</h3>
					<p> Last seen: { //new Date( messages[messages.length -1].timestamp?.toDate()).toUTCString()} 
					}</p>
				</div>
			</div>
			<div className="chat__body">
				{messages.map((message) => (
				<p className={`chat__message ${ message.name == user.displayName && `chat__messageReceived` }`}>
					{message.message}
					<span className="chat__name">{message.name}</span>
					<span className="time__stamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
				</p>
				))}
			</div>
			<div className="chat__footer">
				<div className="chat__footerIcons">
					<div onClick={() => setEmojis(!emojis)}>
				   <div className='chat__footerEmoji'>
				   {emojis === true && <Emoji />}
				   {console.log(chosenEmoji)}
				   </div>
				   <IconButton>
					<SentimentSatisfiedOutlinedIcon />
				   </IconButton>
					</div>
				</div>
				<form>
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Type a message"
						type="text"
					/>
					<button onClick={onEmojiClick} type="submit" />
				</form>
				<MicRoundedIcon />
			</div>
		</div>
	);
}

export default Chat;
