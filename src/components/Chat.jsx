import React, { useState, useEffect, useRef } from 'react';
import Footer from './Footer';
import { motion } from 'framer-motion';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm your CarBot . Ask me anything about cars!" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // TEXT-TO-SPEECH
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speak(messages[0].text);

    // Setup SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        setInput(voiceInput);
        handleVoiceSubmit(voiceInput);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const pairs = [
    [/(hi|hello|hey)/i, ["Hello! How can I assist you with cars today?"]],
    [/buy a car/i, ["Sure! You can browse our available cars in the 'Buy' section."]],
    [/sell a car/i, ["List your car in the 'Sell' section. Need help getting started?"]],
    [/recommend/i, ["Tell me your budget and preferred car type."]],
    [/quit/i, ["Goodbye! Drive safe!"]],
    [/(.*)/, ["Hmm... I didn’t understand that. Try asking about buying or selling cars."]],
  ];

  const getBotResponse = (input) => {
    for (let [pattern, responses] of pairs) {
      if (pattern.test(input)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    return "Sorry, I’m malfunctioning 🤖";
  };

  const handleVoiceSubmit = (voiceInput) => {
    const userMessage = { sender: 'user', text: voiceInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(voiceInput);
      const botMessage = { sender: 'bot', text: response };
      setMessages((prev) => [...prev, botMessage]);
      speak(response);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleVoiceSubmit(input);
  };

  const handleMicClick = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className="minee bg-dark text-white min-vh-100 d-flex flex-column">
      <div className="container py-5 text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className="robot-container mb-4">
            <div className="robot-body">
              <div className="robot-head">
                <div className="antennas">
                  <div className="antenna left"></div>
                  <div className="antenna right"></div>
                </div>
                <div className="face">
                  <div className="eyes">
                    <div className="eye left"></div>
                    <div className="eye right"></div>
                  </div>
                  <div className={`mouth ${isTyping ? 'talking' : ''}`}>
                    <div className="mouth-inner"></div>
                  </div>
                </div>
              </div>
              <div className="robot-neck"></div>
              <div className="robot-torso">
                <div className="panel">
                  <div className="led red"></div>
                  <div className="led blue"></div>
                  <div className="led green"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="chat-window bg-light text-dark rounded p-3 shadow mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              className={`text-start mb-2 ${msg.sender === 'user' ? 'text-end' : ''}`}
              initial={{ opacity: 0, x: msg.sender === 'user' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span
                className={`d-inline-block px-3 py-2 rounded ${
                  msg.sender === 'user' ? 'bg-primary text-white' : 'bg-secondary text-white'
                }`}
              >
                {msg.text}
              </span>
            </motion.div>
          ))}
          {isTyping && <p className="text-start text-muted">🤖 typing...</p>}
        </div>

        <form onSubmit={handleSubmit} className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
          <button
            type="button"
            className={`btn btn-${isListening ? 'danger' : 'secondary'}`}
            onClick={handleMicClick}
            title="Voice Input"
          >
            🎤
          </button>
        </form>
      </div>
      <Footer />
      <style>{`
        .robot-container {
          perspective: 1000px;
        }

        .robot-body {
          position: relative;
          width: 150px;
          margin: 0 auto;
          transform-style: preserve-3d;
          animation: float 4s ease-in-out infinite;
        }

        .robot-head {
          background: linear-gradient(145deg, #4a4a4a, #3d3d3d);
          width: 100px;
          height: 100px;
          border-radius: 20px;
          margin: 0 auto;
          position: relative;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .antennas {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          display: flex;
          justify-content: space-between;
        }

        .antenna {
          width: 4px;
          height: 30px;
          background: #666;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            top: -5px;
            left: -3px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: radial-gradient(circle, #fff, #00ff88);
          }
        }

        .face {
          padding: 20px;
        }

        .eyes {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }

        .eye {
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          &::after {
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            background: #00b4d8;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: eye-shine 2s infinite;
          }
        }

        .mouth {
          width: 40px;
          height: 20px;
          margin: 0 auto;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .mouth-inner {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 0 0 20px 20px;
          transform: translateY(${isTyping ? '-5px' : '10px'});
          transition: all 0.3s ease;
        }

        .mouth.talking .mouth-inner {
          transform: translateY(0);
          animation: mouth-talk 0.3s ease infinite alternate;
        }

        .robot-neck {
          width: 40px;
          height: 20px;
          background: #555;
          margin: 0 auto;
          border-radius: 0 0 5px 5px;
        }

        .robot-torso {
          background: linear-gradient(145deg, #4a4a4a, #3d3d3d);
          width: 120px;
          height: 80px;
          margin: 0 auto;
          border-radius: 15px;
          position: relative;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .panel {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 5px;
          .led {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            animation: led-glowing 2s infinite;
            &.red { background: #ff0000; }
            &.blue { background: #0066ff; }
            &.green { background: #00ff00; }
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes mouth-talk {
          to { height: 15px; border-radius: 20px; }
        }

        @keyframes led-glowing {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes eye-shine {
          0%, 100% { transform: translate(-40%, -40%); }
          50% { transform: translate(-60%, -60%); }
        }
      `}</style>
    </div>
);
};

export default ChatBot;
