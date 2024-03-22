import React from "react";

const BanList = ({ banList }) => {
  if (!banList || banList.length === 0) return null;

  const handleRemoveBan = (attribute) => {
    // Implement logic to remove attribute from ban list
  };

  return (
    <div className="ban-list">
      <h2>Ban List</h2>
      <ul>
        {banList.map((item, index) => (
          <li key={index} onClick={() => handleRemoveBan(item)}>
            {item} (Click to remove)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BanList;
