import React from "react";

const BanList = React.memo(({ banList, onRemove }) => {
  return (
    <div className="bg-gray-800 min-h-screen w-1/3 px-4 right-0 absolute">
      <div className="flex items-center text-center justify-center flex-col gap-4 mt-3">
        <h2 className="text-white text-xl font-bold">Ban List</h2>
        <h3 className="text-white text-lg font-normal">Attributes you have banned:</h3>
        {banList.map((attribute, index) => (
          <div key={index} className="bg-red-800 p-2 rounded-md w-full flex justify-between items-center">
            <p className="text-white">{attribute}</p>
            <button onClick={() => onRemove(attribute)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default BanList;