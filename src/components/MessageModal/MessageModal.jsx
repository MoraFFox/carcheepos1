import React, { useState } from 'react';
import './MessageModal.css';

const MessageModal = ({ recipient, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div className="message-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="message-modal__header">
          <h3>Message to {recipient.name}</h3>
        </div>

        <form onSubmit={handleSubmit} className="message-modal__content">
          <div className="message-input-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              required
            />
          </div>

          <div className="message-modal__actions">
            <button 
              type="button" 
              className="message-btn cancel" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="message-btn send"
              disabled={!message.trim()}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;
