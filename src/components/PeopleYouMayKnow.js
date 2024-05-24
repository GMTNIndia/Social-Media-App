import React from 'react';

const PeopleYouMayKnow = ({ users }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold mb-4">People you may know</h2>
      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <img className="w-4 h-10 rounded-full" src={user.image} alt="User" />
              <div className="font-bold">{user.name}</div>
            </div>
            <button className="bg-purple-500 text-white px-4 py-1 rounded-md">Show</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleYouMayKnow;
