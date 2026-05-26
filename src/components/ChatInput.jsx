import { useState } from 'react'
import{ chatbot } from 'supersimpledev'


export function ChatInput({ chatMessage, setChatMessage, onLoadingChange }) {
      const [inputText, setInputText] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      
      function saveInputTexts(event) {
        setInputText(event.target.value);
      }

      async function sendMessage() {
        if (inputText.trim() === '' || isLoading) return;

        const newChatMessage = [
          ...chatMessage,
          {
            message: inputText,
            sender: 'user',
            id: crypto.randomUUID()
          }
        ];
        setChatMessage(newChatMessage);
        const messageToSend = inputText;
        setInputText('');
        setIsLoading(true);
        onLoadingChange(true);
        try {
          const response = await chatbot.getResponseAsync(messageToSend);
          setChatMessage([
            ...newChatMessage,
            {
              message: response,
              sender: 'bot',
              id: crypto.randomUUID()
            }
          ]);
        }
        catch (error) {
          console.error(`Failed to get from chatbot:${error}`)
        }
        finally {
          setIsLoading(false);
          onLoadingChange(false);
        }
      }

      function makeEnter(event) {
        if (event.key === "Enter") {
          sendMessage();
        }
        if (event.key === "Escape") setInputText("");
      }

      return (
        <div className="display-input">
          {/* Note: Cleaned up size="30" attribute to prevent CSS width override layout bugs */}
          <input 
            placeholder="Send a message to ChatBot"
            onChange={saveInputTexts}
            onKeyDown={makeEnter}
            value={inputText}
            className="send-input"
          />
          <button onClick={sendMessage} className="send-button">Send</button>
        </div>
      );
}