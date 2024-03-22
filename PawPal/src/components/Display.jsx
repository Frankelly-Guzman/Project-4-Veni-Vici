import React from "react";

const Display = ({ data, addToBanList }) => {
  if (!data) return null;

  const { id, url, breeds } = data;

  const handleBanClick = (attribute) => {
    addToBanList(attribute);
  };

  console.log("Breeds:", breeds);

  return (
    <div className="display">
      <img src={url} alt={`Dog ${id}`} />
      {breeds && breeds.length > 0 ? (
        breeds.map((breed, index) => (
          <div key={index}>
            <p>Breed: {breed.name}</p>
            {breed.origin && <p>Origin: {breed.origin}</p>}
            <button onClick={() => handleBanClick(breed.name)}>
              Ban {breed.name}
            </button>
          </div>
        ))
      ) : (
        <p>No breed information available for this image.</p>
      )}
    </div>
  );
};

export default Display;
