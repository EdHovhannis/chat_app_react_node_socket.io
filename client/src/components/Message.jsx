import React from 'react'
import reactEmoji from 'react-emoji'

const Message = ({ name, message }) => {
    let isCurrentUser = false
    const trimed = name.trim().toLowerCase()
    const user = message.user
    const text = message.text
    if (user === trimed) {
        isCurrentUser = true
    }
    return (
        <div>
            {
                isCurrentUser
                    ? <div className="rightSide">
                        <p><em style={{color:"gray"}}>{trimed}</em>&nbsp;{reactEmoji.emojify(text)}</p> 
                    </div>
                    : <div className="leftSide">
                         <p><em>{user}</em>&nbsp;{reactEmoji.emojify(text)}</p> 
                    </div>
            }
        </div>
    );
}

export default Message
