import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import Message from './Message'
import UsersInfo from './UsersInfo'

let socket
const Chat = (props) => {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [messages, setAllMessages] = useState([])
    const [allusers, setUsers] = useState([])
    const [message, setMessage] = useState("")
    const [error, setErr] = useState("")

    useEffect(() => {
        const url = "http://127.0.0.1:5000/"
        socket = io(url, { transports: ["websocket"] })

        const { name, room } = queryString.parse(props.location.search)
        setName(name)
        setRoom(room)

        socket.emit("join", { name, room }, (error) => { setErr(error) })
        socket.on("roomData", ({ users }) => {
            setUsers(users)
         })
        return () => {
            socket.emit("disconnect")
            socket.off()
        }
    }, [props.location.search])

    useEffect(() => {
        socket.on("message", (message) => {
            setAllMessages([...messages, message])
        })
       
        document.querySelector(".messages").scrollTop = document.querySelector(".messages").scrollHeight;
    }, [messages])

    const collectMessage = (e) => {
        setMessage(e.target.value)
    }
    const doMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit("sendMessage", message, () => { })
        }
        setMessage('')
    }
    
    return (
        <div className="chatcontent">
            <div className="chat">
                <div className="infoBar">
                    <span> room: </span> <em>{room}</em>
                    <div className="info_icons">
                        
                        <a href="/">
                            <i className="fas fa-times icon_trash"></i>
                        </a>
                    </div>
                </div>
                <div className="messages">
                    {messages.map((message, key) => {
                        return <div key={key}>
                            {error ? alert("Something wrong") : <Message message={message} name={name} />}
                        </div>
                    })}
                </div>
                <form className="chat_form">
                    <input type="text" onKeyPress={e => e.key === "Enter" ? doMessage(e) : null} onChange={collectMessage} value={message} placeholder="Type here ..." />
                    <button onClick={doMessage}>Send</button>
                </form>
            </div>
            <div className="onlineusers">
                <h1 style={{textAlign:"center"}}> In this room online: </h1>
                  {allusers.map((users, key)=>{
                      return <UsersInfo key={key} users={users}/>  
                  })} 
            </div>
        </div>
    )
}

export default Chat
