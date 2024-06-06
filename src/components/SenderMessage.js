import React from 'react';

function SenderMessage({ message, timestamp, Receiver }) {
  return (
    <div className="flex justify-start mt-3">
      <div className="flex flex-col mt-4 items-end w-fit">
        <div className="px-5 py-2.5 text-xs leading-4 bg-zinc-600 text-white rounded-tl-xl rounded-br-xl rounded-bl-xl shadow-sm">
          {message}
        </div>
        <div className="mt-1 text-xs text-zinc-600 self-end">{timestamp}</div>
        <div className="text-xs text-gray-600 mt-1">{Receiver}</div>
      </div>
    </div>
  );
}

export default SenderMessage;
