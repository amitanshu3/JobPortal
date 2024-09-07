import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { useSelector } from 'react-redux';

export default function Main() {
    const {
        onSent,
        recentprompt,
        showresult,
        Loading,
        resultData,
        setinput,
        input,
    } = useContext(Context);
 const {user}=useSelector(store=>store.auth);
    return (
        <div className='main'>
            <div className="nav">
                <p>Carrer Bot</p>

            </div>


            <div className="main-container">
                {!showresult ?
                    <div className="greet">
                        <p><span>Hello , Dev.</span></p>
                        <p>How can I help you today?</p>

                        <div className="cards">
                            <div className="card" onClick={() => onSent("Suggest beautiful places to see on an upcoming road trip")}>
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent("Briefly summarize this concept :urban planning")}>
                                <p>Briefly summarize this concept :urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}>
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => onSent("Improve the readability of the following code")}>
                                <p>Improve the readability of the following code</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </div>
                    : <div className='value'>
                        <div className="result-title">
                            <img src={user.profile.profilePhoto} alt="" />
                            <p>{recentprompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />

                            {Loading ? <div className='Loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div> : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}

                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text" placeholder='Enter a prompt here' onChange={(e) => setinput(e.target.value)} value={input} />
                        <div>
                            
                            {input ? <img src={assets.send_icon} alt="" onClick={() => onSent()} /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gem AI may display inaccurate inf , including about people. so double-check its responses. Your privacy and Gem AI Apps
                    </p>
                </div>
            </div>
        </div>
    );
}
