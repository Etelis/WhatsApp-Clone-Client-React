import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import { useParams } from "react-router-dom";
import db from "./firebase";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from './StateProvider';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import UploadFileIcon from '@mui/icons-material/UploadFile';



function Chat() {
	const [input, setInput] = useState('');
	const [{user}, dispatch] = useStateValue();
	const { roomId } = useParams();
	const [roomName, setRoomName] = useState('');
	const [messages, setMessages] = useState([]);
	const [emojis, setEmojis] = useState(false);
	const [showAttachMenu, setAttachMenu] = useState(false);
	const messageEndRef = useRef(null);

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

	useEffect (() =>{
		messageEndRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
	}, [messages]);

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
				<span ref={messageEndRef} />
			</div>
			<div className="chat__footer">
				<div className="chat__footerIcons">
					<div onMouseEnter={() => setAttachMenu(true)}
						 onMouseLeave={() => setAttachMenu(false)}>
						{showAttachMenu && 
						<span className='attachmentMenu'>
							<ul>
								<li>
									<InsertPhotoIcon />
								</li>
								<li>
									<UploadFileIcon />
								</li> 
							</ul>
						</span>
						}	
						<IconButton>
							<AttachFileIcon />
						</IconButton>
					</div>
					<div onMouseEnter={() => setEmojis(true)}
						 onMouseLeave={() => setEmojis(false)}>
				   <div className='chat__footerEmoji'>
					{emojis === true && 
					<span className='emoji__selection'> 
						<Picker onEmojiClick={(event, emojiObject) => { setInput(input + emojiObject.emoji);}} 
						skinTone={SKIN_TONE_MEDIUM_DARK} /> 
					</span> }
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
					<button onClick={sendMessage} type="submit" />
				</form>
				<MicRoundedIcon />
			</div>
		</div>
	);
}

export default Chat;
