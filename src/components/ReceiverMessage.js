import React from 'react';

function ReceiverMessage({ message, timestamp }) {
  return (
    <section>
    <div className="flex justify-end mt-3 ">
      <div className="flex flex-col mt-4 items-start w-fit">
        <div className="px-5 py-2.5  text-xs leading-4 bg-purple-600 text-white rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-sm">
          {message}
        </div>
        <div className="mt-1 text-xs text-gray-600 self-start">{timestamp}</div>
      </div>
    </div>
    </section>
  );
}

export default ReceiverMessage;
