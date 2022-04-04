import React, { useState } from 'react';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import './Emoji.css';
function Emoji() {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };
  
    return (
    <span className='emoji__selection'>
        <Picker onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK} />
    </span>
    );
}

export default Emoji
