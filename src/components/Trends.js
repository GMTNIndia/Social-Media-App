import React from 'react';

const Trends = ({ trends }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="font-bold mb-4">Trends</h2>
      <div className="space-y-2">
        {trends.map((trend, index) => (
          <div className="flex justify-between items-center" key={index}>
            <div>#{trend}</div>
            <button className="bg-purple-500 text-white px-4 py-1 rounded-md">Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trends;
