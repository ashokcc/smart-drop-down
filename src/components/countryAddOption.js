import React from "react";

export default ({ searchText, addNewCountry, isUserHasAccess }) => {
  return (
    <li style={{ flex: 1 }} data-val={searchText}>
      <div style={{ flex: 1 }}> "{searchText}" not found</div>
      {isUserHasAccess ? (
        <button
          style={{ padding: 3 }}
          onClick={(e) => addNewCountry(e, searchText)}
        >
          Add &amp; Select
        </button>
      ) : null}
    </li>
  );
};
