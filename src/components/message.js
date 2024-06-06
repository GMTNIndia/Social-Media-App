import React from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';

function Message({ message, timestamp, Sender, Receiver, userId }) {
  const isSentByCurrentUser = Sender === userId;

  return (
    <div>
      {isSentByCurrentUser ? (
        <SenderMessage message={message} timestamp={timestamp}  />
      ) : (
        <ReceiverMessage message={message} timestamp={timestamp} Receiver={Receiver} />
      )}
    </div>
  );
}

export default Message;
