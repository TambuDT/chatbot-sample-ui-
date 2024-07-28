import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import QueryComponent from './components/Query';
import ReplyComponent from './components/Reply';

function App() {
  const [messages, setMessages] = useState([]); //variabile per i messaggi
  const [inputValue, setInputValue] = useState(''); //input preso dal form
  const [isReplying, setIsReplying] = useState(false); //variaile che uso per capire se sta ancora rispondendo e non permetto di inviare altre richieste 
  const messagesEndRef = useRef(null); //variabile del messaggio per lo scroll (riferimento)


  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isReplying) {
      setIsReplying(true);

      //aggiungi la domanda alla chat
      const newMessages = [...messages, { type: 'query', text: inputValue }];
      setMessages(newMessages);
      setInputValue('');

      //simulo una risposta automatica
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'reply', text: 'Risposta' },
        ]);
        setIsReplying(false);
      }, 500);
    }
  };


  //questo serve per lo scroll aurtomatico aggiunge un riferimento al messaggio corrente e man mano esegue uno scroll verso il basso 
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className='main-wrapper'>
      <div className='chat-wrapper'>
        {messages.map((msg, index) => (
          msg.type === 'query' ? (
            <QueryComponent key={index} message={msg.text} /> //in base al tipo passato dalla funzione che si occupa di creare il messaggio o la risposta crea uno o l'laltro 
          ) : (
            <ReplyComponent key={index} message={msg.text} />
          )
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className='chatbot-input'>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
          <input
            type='text'
            id='chatbot-input'
            placeholder='Scrivi un messaggio...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button id='send-button' type='submit'>Invia</button>
        </form>
      </div>
    </div>
  );
}

export default App;
