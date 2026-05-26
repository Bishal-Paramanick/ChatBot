import { useState} from 'react'
import { ChatMessages } from './components/ChatMessages';
import {ChatInput} from './components/ChatInput'
import './App.css'


function App() {
  const [isBotLoading, setIsBotLoading] = useState(false);
      const [chatMessage, setChatMessage] = useState([]);

      return (
        <div className="app-conatiner">
          <ChatMessages 
            chatMessage={chatMessage}
            isBotLoading={isBotLoading}
          />
          <ChatInput
            chatMessage={chatMessage} 
            setChatMessage={setChatMessage} 
            onLoadingChange={setIsBotLoading}
          />
        </div>
      );
}

export default App
