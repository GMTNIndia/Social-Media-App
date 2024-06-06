import React from 'react';

function Person({ username, userId, status, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`flex gap-5 justify-between mt-5 w-full cursor-pointer ${isSelected ? "bg-gray-200" : ""}`}
    >
      <div className="flex gap-2.5 text-xs font-medium text-neutral-900">
        <div className="my-auto">{username}</div>
      </div>
      <div className={`my-auto text-xs font-semibold ${status === "Active Now" ? "text-green-500" : "text-zinc-600"}`}>
        {status}
      </div>
    </div>
  );
}

export default Person;
