import React from 'react';

const History = React.memo(({ history }) => {
  return (
    <div className="absolute left-0 w-1/4 bg-transparent min-h-screen">
      <div className="history-container bg-gray-800 p-4 w-full h-[100vh] overflow-y-auto">
        <h2 className='text-white text-xl font-semibold'>History</h2>
        {history.map((item, index) => {
          const breedName = item.breeds?.[0]?.name || "Unknown Breed";
          return (
            <div key={index} className="bg-gray-900 p-2 rounded-md w-full mb-2">
              <img src={item.url} alt={`Dog`} className="w-full h-auto rounded mb-2" />
              <p className="text-white">Breed: {breedName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default History;