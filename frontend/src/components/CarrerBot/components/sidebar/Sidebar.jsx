import React, { useContext } from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import { Context } from '../../context/Context.jsx'

export default function Sidebar() {

    const [extended, setextended] = useState(false)
     const {onSent, previousprompt, setrecentprompt,newchat} = useContext(Context);


     const Loadprompt =async (prompt)=>{
        setrecentprompt(prompt)
        await onSent(prompt)
     }

    return (
        <div className='sidebar'>
            <div className='top'>
                <img className="menu" src={assets.menu_icon} alt="" onClick={() => setextended(!extended)} />
                <div onClick={()=>newchat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended
                    ? <div className="recent">
                        <p className="recent-title">Recent</p>
                        {previousprompt.map((item,index) => {
                            return (
                                <div className="recent-entry" onClick={()=>Loadprompt(item)}>
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0,18)} ...</p>
                                </div>
                            )
                        })}

                    </div> : null}

            </div>
            <div className="botton">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                
            </div>
        </div>
    )
}
