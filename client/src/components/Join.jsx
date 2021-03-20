import React, { useState } from 'react'



const Join = (props) => {

    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    const toChat = (e) => {
        e.preventDefault()
        setName("")
        setRoom("")
    }
    return (
        <div>
            <form className="joiner_form" onSubmit={toChat}>
                <h1 className="form_title"> Join to Chat </h1>
                <div className="form_controls">

                    <div className="inp">
                        <input className="name_input" type="text" placeholder="Name..." value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="inp">
                        <input className="room_input" type="text" placeholder="Room..." value={room} onChange={e => setRoom(e.target.value)} />
                    </div>

                    <div className="button_block">
                        <div className="bor"></div>
                        <button
                        type="submit" 
                        className="btn"
                        onClick={()=> (!name||!room)?props.history.push(`/`):props.history.push(`/chat/?name=${name}&room=${room}`)}
                        > Join </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Join
