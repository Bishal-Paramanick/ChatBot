import {useEffect} from 'react'
import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import dayjs from 'dayjs'


 export function ChatMessage({ message, sender,timeStamp }) {
  const valid=timeStamp==='loading'?undefined:timeStamp
  const displayTime=dayjs(valid).format('h:mm A');
  
      return (
        <div className={sender === 'bot' ? 'message-bot' : 'message-user'}>
      {sender === 'bot' && <img src={RobotProfileImage} className="chat-avatar" alt="bot" />}
      
      {/* Grouping content together keeps your layout structure safe */}
      <div className="message-content-group">
        <div className="message-display">
          {message}
        </div>
        <span className='chat-timestamp'>{displayTime}</span>
      </div>
      
      {sender === "user" && <img src={UserProfileImage} className="chat-avatar" alt="user" />}
    </div>
      );
    }

   export function ChatMessages({ chatMessage, isBotLoading }) {
      
      // CRITICAL FIX: Monitors the chat logs. The split second a message is added,
      // it programmatically scrolls the main browser window down to the absolute bottom.
      useEffect(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth' // Makes the browser glide down smoothly
        });
      }, [chatMessage, isBotLoading]);

      return (
        <>
          {chatMessage.map((chatMess) => (
            <ChatMessage
              message={chatMess.message}
              sender={chatMess.sender}
              key={chatMess.id}
              timeStamp={chatMess.timeStamp}
            />
          ))}
          {isBotLoading && (
            <ChatMessage
              message="Loading..."
              sender="bot"
              key="loading-message"
              timeStamp="loading"
            />
          )}
        </>
      );
    }