import React, { useEffect, useState, useRef } from 'react'
import './style.scss'
import * as Icon from 'react-bootstrap-icons';
import { API_CHATBOT } from '../../../utils/Api';
function Chat() {
    const [query, setQuery] = useState('')
    const [botMessage, setBotMessage] = useState([])
    const [myMessage, setMyMessage] = useState('')
    const [allMessage] = useState([])
    const [list] = useState([])
    const messagesEndRef = useRef(null)
    const uniqueRobotMess = [...new Set(allMessage)]
    const uniqueUserMess = [...new Set(list)]

    // Mapping two array: bot message,user message 
    const user = uniqueUserMess.map((mess) => mess)
    const robot = uniqueRobotMess.map((mess) => mess.response)

    const boxChat = user.map((key, index) => {
        return {
            key: key,
            value: robot[index]
        }
    })

    // Pust message into array when have a new messge
    allMessage.push(botMessage)
    list.push(myMessage)


    // Get data when typing text
        const sendMessage = async (e) => {
            if (e.key === 'Enter') {
                await fetch(`${API_CHATBOT}${query}`)
                    .then(res => res.json())
                    .then(data => {
                        setBotMessage(data)
                        setQuery('')
                        setMyMessage(query)
                    })
            }
        }

    // Scroll botom when new message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    })

    return (
        <div className='team chat-app'>
            <div className="chat-container">
                {/* Header */}
                <div className="chat-container-header">
                    <div className="chat-info">
                        <div className="avatar">
                            <img src="https://manometcurrent.com/wp-content/uploads/2021/07/Humanoid-Robot-Market.jpeg" alt="" />
                            <div className="name-user">
                                <p className='name-rob'>Dalziel AI<span><Icon.Dot size={23} /> Online</span></p>
                                <p style={{ fontSize: '15px' }} className='tag'>@Robot</p>
                            </div>
                        </div>
                    </div>
                    <div className="chat-contact">
                        <button className='call'><Icon.Telephone size={16} /> Call</button>
                        <button className='archive'>Archive</button>
                        <button className='view-profile'>View profile</button>
                    </div>
                </div>
                {/* Content */}
                <div className="chat-container-content">
                     {botMessage && (
                        <div className='box-chat'>
                            <div className="bot-mess" style={{ marginTop: '30px' }}>
                                <img src="https://manometcurrent.com/wp-content/uploads/2021/07/Humanoid-Robot-Market.jpeg" alt="" />
                                <div className="bot-mess-detail">
                                    <p style={{ fontSize: '15px' }}>Dalziel AI</p>
                                    <p className='text-bot'>Hey Whats up?</p>
                                </div>
                            </div>
                        </div>
                    )} 
        
                    {/* Box Chat */}
                    { myMessage && (
                    <div className="box-chat">
                        {boxChat.slice(1,).map((item) => (
                            <>
                                <div className="user-mess">
                                    <p className='text-user'>{item.key}</p>
                                </div>
                                <div className="bot-mess">
                                    <img src="https://manometcurrent.com/wp-content/uploads/2021/07/Humanoid-Robot-Market.jpeg" alt="" />
                                    <div className="bot-mess-detail">
                                        <p style={{ fontSize: '15px' }}>Dalziel AI</p>
                                        <p className='text-bot'>{item.value}</p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                    )}

                    {/* Scroll to bottom */}
                    <div ref={messagesEndRef} />
                </div>
                {/* Footer */}
                <div className="chat-container-footer">
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={sendMessage}
                        placeholder='Send a message' />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat
